---
title: omni-docking-bench, 근거리 정밀 도킹 실험을 다시 돌려 보는 법
description: ICROS 2026 학술대회 논문의 도킹 벤치마크를 같은 조건에서 재현할 수 있게 묶은 패키지를 소개합니다. 실험 조건, 실행 방법, 결과 파일 구성을 정리했습니다.
pubDate: '2026-04-17T09:00:00+09:00'
updatedDate: '2026-11-11T09:00:00+09:00'
draft: false
topic: Research
tags: [ros2, nav2, docking, reproducibility]
---

ICROS 2026 학술대회에서 발표한 도킹 제어 연구는 다른 사람이 같은 조건에서 결과를 다시 돌려 볼 수 있어야 한다고 생각했습니다. 그래서 실험 환경 전체를 ROS 2 워크스페이스 하나로 묶어 [omni-docking-bench](https://github.com/mach0312/omni-docking-bench)로 공개했습니다.

## 무엇을 비교하나

출발 거리 3 cm에서 목표 자세로 들어가 3 mm 기준 안에 수렴하는지를 봅니다. 접근 방향 8개, 헤딩 오프셋, 반복 횟수를 격자로 조합해 세 제어기를 같은 조건에서 돌립니다.

| 제어기 | 방식 | 역할 |
|---|---|---|
| Kinematic | PGV 측정을 직접 되먹임하는 기구학 기반 제어 (`pgv_guided_controller`) | 제안 방법 |
| MPPI | 샘플링 기반 MPC (Nav2) | 비교군 |
| DWB | Dynamic Window Approach (Nav2) | 비교군 |

대상 환경은 Ubuntu 24.04의 ROS 2 Jazzy(x86_64)입니다.

## 실행하기

네이티브 설치, Docker 컨테이너 하나, docker-compose 세 가지 방법을 지원합니다. 가장 짧은 경로는 네이티브 Jazzy 환경입니다.

```bash
git clone https://github.com/mach0312/omni-docking-bench.git ~/omni_docking_bench_ws
cd ~/omni_docking_bench_ws

# 미리 빌드한 제어기 플러그인(.so)을 받는다
curl -L -o libs/double_steering_drive_controller/lib/libdouble_steering_drive_controller.so \
  https://github.com/mach0312/omni-docking-bench/releases/download/v0.1.0/libdouble_steering_drive_controller.so

source /opt/ros/jazzy/setup.bash
colcon build --symlink-install
source install/setup.bash

# 기구학 제어기, 24회 시행 (약 5분)
ros2 launch icros_test_setup experiment_kinematic.launch.py \
  heading_offsets_deg:='[0.0]' repeats:=3
```

Docker로 돌릴 때도 플러그인 파일을 같은 위치에 넣은 뒤 `docker/Dockerfile.jazzy`로 이미지를 만들면 됩니다.

## 결과 파일

실험 한 번이 끝나면 `results/<controller>_<timestamp>/` 아래에 다음이 남습니다.

- `summary.csv`: 시행마다 한 줄
- `timeseries/trial_XXX.csv`: 자세, 속도, 관절 상태를 50 Hz로 남긴 시계열
- `metrics.csv`: 시행별 평가 지표 7종
- `report.txt`: 집계 통계
- `plots/*.png`: 수렴 곡선, 극좌표 그림, 히트맵

제어기끼리 비교할 때는 결과 폴더를 한꺼번에 넘깁니다.

```bash
python3 src/icros_test_setup/scripts/plot_compare.py \
  results/kinematic_* results/mppi_* results/dwb_*
```

저장소에 샘플 실행 결과(`results/*_sample/`)가 들어 있어서, 전체 벤치마크를 돌리기 전에 그림 생성 경로부터 확인할 수 있습니다.

## 제어기 플러그인을 바이너리로 둔 이유

`double_steering_drive_controller`는 소스 대신 미리 빌드한 공유 라이브러리로 배포합니다. `controller_manager`가 pluginlib로 컨트롤러를 동적 로드하도록 구성했습니다. 지원 플랫폼과 의존성, ABI가 맞아야 하며, 다른 환경에서의 실행을 보장하지는 않습니다. 바이너리를 만드는 절차는 저장소 문서에 있지만, 해당 소스 전체가 이 재현 패키지에 포함된 것은 아닙니다.

## 지금 상태

논문 재현용 패키지와 `v0.1.0` 릴리스는 공개되어 있습니다. 글 날짜는 저장소를 만든 2026년 4월 17일을 기준으로 두었고, 내용은 이후 릴리스까지 돌아본 기록입니다. 3 mm는 실험의 수렴 판정 기준이지 모든 시행의 실측 오차나 실차 성능을 뜻하지 않습니다.

위 실행 예시는 저장소가 제공하는 재현 절차입니다. 이번 글 정리 과정에서 전체 벤치마크를 새로 실행하거나 실차 성능을 다시 측정한 것은 아닙니다. 초기 공개 DSD 제어기 소스와 배포 바이너리가 동일하다고 단정하지도 않습니다.
