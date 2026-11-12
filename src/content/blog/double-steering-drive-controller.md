---
title: Double Steering Drive 제어기 개발
description: 앞뒤 바퀴가 각각 조향하고 구동하는 로봇의 ros2_control 제어기를 개인 공개본에서 시작해 2세대 AMR의 주행 제어기로 발전시킨 기록입니다.
pubDate: '2025-06-30T09:00:00+09:00'
updatedDate: '2026-11-12T09:00:00+09:00'
topic: Engineering
tags: [ros2, ros2-control, kinematics, steering, control]
series: '구동·모션 제어'
seriesOrder: 1
draft: false
---

DSD(Double Steering Drive)는 앞뒤 바퀴가 각각 독립적으로 조향하고 구동하는 구조입니다. 차체 방향을 유지한 채 옆으로 움직이거나 제자리에서 돌 수 있어, 배터리를 옮기는 2세대 AMR의 구동 방식으로 쓰고 있습니다. 이 구동계를 ROS 2에서 다루기 위한 ros2_control 제어기를 개발했습니다.

## 차체 속도를 바퀴 명령으로 바꾸기

제어기는 차체 속도 명령을 앞뒤 바퀴의 조향각과 구동 속도로 바꾸고, 바퀴 상태로부터 오도메트리를 계산합니다. ros2_control의 diff_drive_controller 구조를 바탕으로 이중 조향 기구학을 넣어 확장했습니다.

기구학 식만으로는 실제 구동계가 매끄럽게 움직이지 않아 다음 기능을 더했습니다.

- 최단 조향: 목표 각이 90도를 넘으면 조향을 반대로 잡고 바퀴를 역회전시켜 큰 조향 동작을 피합니다.
- 조향 변화율 제한: 조향 명령이 한 번에 크게 바뀌지 않도록 제한합니다.
- 조향 추종에 따른 바퀴 감속: 바퀴가 아직 목표 방향을 향하지 못했으면 구동 속도를 줄입니다. 처음에는 명령값끼리 비교했지만 실제 조향 피드백과 목표를 비교하도록 바꿨고, 필터와 부호 전환 잠금을 더해 떨림을 줄였습니다.
- 카트 견인 모드: 카트를 끄는 동안에는 옆걸음을 막고 카트 축을 기준으로 조향각을 계산합니다.

## 공개본에서 제품 제어기로

2025년 여름 로봇 모델, 하드웨어 인터페이스 데모와 제어기를 개인 저장소에 나눠 공개했습니다([dsd_bot_description](https://github.com/mach0312/dsd_bot_description), [dsd_control_demo](https://github.com/mach0312/dsd_control_demo), [double_steering_drive_controller](https://github.com/mach0312/double_steering_drive_controller)). 최단 조향, 변화율 제한과 오도메트리 보정은 이 공개본에서 만들었고, 피드백 기반 감속과 카트 모드는 회사 저장소로 옮겨 2세대 AMR에 적용하면서 더했습니다.

정밀 도킹 연구의 재현 패키지 [omni-docking-bench](/blog/omni-docking-bench/)에도 이 제어기를 바이너리로 넣었습니다. 다만 초기 공개 소스와 같은 버전으로 보지는 않습니다.

## 지금 상태

2세대 AMR의 주행 제어기로 쓰고 있으며, 로봇 전체의 무인 운용 승인은 현장 검증이 끝날 때까지 보류 중입니다. 공개 저장소는 초기본으로 남아 있습니다. 글 날짜는 공개 저장소를 만든 날이고, 내용은 이후 회사 개발까지 포함한 회고입니다.
