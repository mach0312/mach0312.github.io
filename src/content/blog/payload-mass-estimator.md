---
title: 주행 중에 적재 질량을 추정하는 ROS 2 노드 설계
description: 구동력과 가속도만으로 적재 질량을 온라인 추정하는 payload_mass_estimator의 모델, 갱신 조건, 다른 모듈과의 경계를 정리했습니다.
pubDate: '2026-11-10T11:00:00+09:00'
topic: Engineering
tags: [ros2, estimation, rls]
---

짐을 싣고 다니는 이동로봇은 적재물에 따라 전체 질량이 크게 달라집니다. 제어기나 학습 모델이 이 값을 쓰려면 지금 질량이 얼마인지뿐 아니라 그 추정을 믿어도 되는지도 함께 알아야 합니다. [payload_mass_estimator](https://github.com/mach0312/payload_mass_estimator)는 그 두 가지를 같이 내보내는 ROS 2 노드입니다.

## 모델

종방향 구동력 $y$를 유효 가속도에 대한 선형식으로 둡니다.

$$
y = m_{\text{total}}\, a_{\text{eff},x} + b_x
$$

$$
a_{\text{eff},x} = a_x + c_{rr}\, g \tanh\!\left(\frac{v_x}{v_0}\right)
$$

두 번째 식의 $\tanh$ 항은 구름 저항을 진행 방향에 따라 매끄럽게 반영하는 보정입니다. 추정한 전체 질량에서 차체 질량을 빼면 적재 질량이 됩니다.

$$
\hat{m}_{\text{payload}} = \hat{m}_{\text{total}} - m_{\text{body}}
$$

질량과 편향 $b_x$는 범위를 제한한 RLS로 함께 추정합니다.

## 아무 때나 갱신하지 않는다

질량을 식별할 수 있는 때는 거의 직진하면서 가속이 충분히 걸리는 구간뿐입니다. 그래서 아래 조건을 모두 만족할 때만 갱신하고, 나머지 구간에서는 마지막 추정값을 유지합니다. 기본값은 `config/dsd_amr.yaml`에 있습니다.

| 조건 | 기본값 |
|---|---|
| 유효 가속도 $\lvert a_{\text{eff},x}\rvert$ | 0.08 m/s² 이상 |
| 횡방향 속도 $\lvert v_y\rvert$ | 0.03 m/s 이하 |
| 요 각속도 | 0.03 rad/s 이하 |
| 입력 데이터 나이 | 0.2 s 이하 |

갱신을 거부하면 이유를 `~/status.reject_reason`으로 내보내기 때문에, 추정값이 왜 안 바뀌는지 토픽만 보고 알 수 있습니다. 추정값은 `min_valid_updates`번 이상 갱신된 뒤에야 유효(`valid`)로 표시됩니다.

## 입력 계약

`/drive_wrench`의 `wrench.force.x`에는 보정된 차체 기준 종방향 구동력(N)이 들어와야 합니다. 특정 모터 드라이버를 가정하지 않으므로, 모터 토크나 전류를 구동력으로 바꾸는 일은 별도 어댑터가 맡습니다. `/joint_states.effort`가 바퀴 축 토크로 보정되어 있다면 내장 어댑터를 켤 수 있습니다.

```bash
ros2 launch payload_mass_estimator payload_mass_estimator.launch.py use_joint_state_adapter:=true
```

보정하지 않은 전류나 정규화된 명령값을 그대로 넣으면 안 됩니다.

## 다른 모듈과의 경계

캐스터 잔차 학습 같은 하위 모듈은 이 추정값을 필요할 때 받아 쓸 뿐이고, 질량 추정이 잔차 학습에 기대지는 않습니다. 추정기를 따로 떼어 두면 무엇을 근거로 값을 냈는지 따라가기 쉽고, 다른 로봇에도 그대로 가져다 쓸 수 있습니다.

```text
payload_mass_estimator   -> m_hat 발행
caster_residual_learning -> 필요하면 m_hat을 조건 변수로 사용
controller / NMPC        -> m_hat과 잔차 모델을 valid일 때만 사용
```
