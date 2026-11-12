---
title: Nav2에 기여한 전방향 이동 로봇의 속도 판정 수정
description: 홀로노믹 로봇의 측면 이동을 올바르게 판정하도록 Nav2 Collision Monitor의 코드와 문서를 수정하고 upstream에 반영했습니다.
pubDate: '2026-02-12T09:00:00+09:00'
updatedDate: '2026-11-11T09:00:00+09:00'
topic: Engineering
tags: [nav2, ros2, open-source, collision-monitor]
series: '구동·모션 제어'
seriesOrder: 5
draft: false
---

전방향으로 움직이는 로봇은 차체 방향을 유지한 채 옆으로 이동할 수 있습니다. 그런데 Nav2 Collision Monitor의 일부 속도 판정은 전후 방향 성분만 사용해, 측면으로 주행하는데도 정지 상태용 감시 영역을 선택하는 문제가 있었습니다.

## 로봇의 움직임에 맞게 판정 바꾸기

기존 [이슈](https://github.com/ros-navigation/navigation2/issues/5740)를 바탕으로 홀로노믹 로봇에서는 평면 속도의 크기와 이동 방향을 함께 사용하도록 수정했습니다. 일반적인 전후진 로봇의 기존 동작은 유지하면서 전방향 이동에 필요한 판정만 분리했습니다.

코드만 바꾸는 것으로 끝내지 않고 관련 테스트와 파라미터 설명, 설정 예시도 함께 수정했습니다. 로봇의 운동 특성이 소프트웨어의 조건문과 사용자 설정에 어떻게 연결되는지 다룬 작업입니다.

## upstream 리뷰와 반영

[코드 PR #5954](https://github.com/ros-navigation/navigation2/pull/5954)와 [문서 PR #871](https://github.com/ros-navigation/docs.nav2.org/pull/871)을 올리고 리뷰를 반영했습니다. 최소 재현으로 수정 전후 동작을 설명하고, 프로젝트의 테스트와 기여 절차에 맞춰 변경을 정리했습니다.

회사 로봇을 개발하며 필요한 수정이 공용 패키지에도 도움이 되는 형태로 반영된 경험입니다.

## 지금 상태

코드와 문서 PR은 upstream에 머지되었고, 코드 수정은 Jazzy 릴리스에도 반영되었습니다. 문서 예시의 추가 정리는 별도 후속 과제로 남겨 두었습니다.
