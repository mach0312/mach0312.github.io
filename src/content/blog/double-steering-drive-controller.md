---
title: 이중 조향 구동 로봇을 위한 ros2_control 제어기
description: 로봇 모델부터 하드웨어 인터페이스, 기구학 기반 제어기까지 이중 조향 구동계를 ROS 2에 연결한 기록입니다.
pubDate: '2025-06-30T09:00:00+09:00'
updatedDate: '2026-11-11T09:00:00+09:00'
topic: Engineering
tags: [ros2, kinematics, steering, control]
draft: false
---

앞뒤 바퀴가 각각 조향하고 구동하는 DSD(Double Steering Drive) 로봇을 ROS 2에서 다루기 위해 모델과 제어기를 구성했습니다. 차체가 이동하려는 방향과 각 바퀴의 조향 방향을 연결하는 저수준 제어 작업입니다.

## 모델과 제어를 나누어 구성하기

관련 작업은 세 공개 저장소로 나눴습니다.

- [dsd_bot_description](https://github.com/mach0312/dsd_bot_description): 로봇 형상과 관절을 표현하는 URDF/Xacro 모델
- [dsd_control_demo](https://github.com/mach0312/dsd_control_demo): 하드웨어 인터페이스와 제어기 기동 구성
- [double_steering_drive_controller](https://github.com/mach0312/double_steering_drive_controller): 차체 속도를 조향각과 바퀴 속도로 변환하는 제어기

ros2_control의 기존 제어기 구조를 바탕으로 이중 조향 기구학과 오도메트리를 연결했습니다. 모델, 하드웨어 연결부와 제어 알고리즘을 분리해 각 역할을 구분했습니다.

## 조향과 구동을 함께 고려하기

목표 조향각을 계산하는 것만으로는 충분하지 않습니다. 바퀴가 아직 방향을 바꾸는 중인데 바로 구동하면 의도한 차체 움직임과 달라질 수 있습니다. 조향 변화와 구동 속도를 함께 다루고, 방향 전환과 정지 조건을 제어기에 반영했습니다.

기구학 식을 실제 로봇 소프트웨어의 명령·상태 인터페이스로 옮기며, 알고리즘과 ROS 2 제어 구조를 함께 설계한 작업입니다.

## 지금 상태

이 글은 초기 공개 구현의 기록이며 후속 개발은 회사로 옮겼습니다. 초기본의 문서와 회귀시험 정리는 남아 있습니다. 논문 재현용 구성은 별도의 [omni-docking-bench](/blog/omni-docking-bench/)에서 다루며, 초기 소스와 배포 바이너리를 같은 버전으로 보지는 않습니다.
