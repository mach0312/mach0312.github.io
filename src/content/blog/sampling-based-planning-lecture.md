---
title: 샘플링 기반 경로 계획을 Python으로 설명한 강의
description: PRM과 RRT 계열 알고리즘을 강의 노트, Python 예제와 영상으로 연결해 정리한 교육 자료입니다.
pubDate: '2025-11-20T09:00:00+09:00'
updatedDate: '2026-11-11T09:00:00+09:00'
topic: Note
tags: [planning, python, rrt, lecture]
draft: false
---

[Sampling-Based-Planning_Tutorial](https://github.com/mach0312/Sampling-Based-Planning_Tutorial)은 경희대학교 RCI Lab에서 샘플링 기반 경로 계획을 설명하기 위해 정리한 강의 자료입니다. 알고리즘의 개념을 설명한 뒤 Python 코드를 따라가며 동작을 살펴보는 구성으로 만들었습니다.

## 개념과 코드 사이를 연결하기

PRM, RRT, RRT*, RRT-Connect와 Informed RRT*를 다룹니다. 단순히 경로가 그려지는 모습을 보여 주기보다 샘플 생성, 충돌 검사와 탐색 확장이 어떤 순서로 이어지는지 설명하는 데 집중했습니다.

알고리즘별로 달라지는 부분도 비교했습니다. RRT*의 재연결이 경로 비용에 어떤 역할을 하는지, 양방향 탐색과 유망 영역 샘플링이 탐색 방식을 어떻게 바꾸는지를 코드와 함께 정리했습니다.

## 강의 자료로 정리한 범위

제가 구성한 것은 강의 노트, 알고리즘 설명과 코드 해설을 연결한 교육 자료입니다. 예제에는 [PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics)와 공통되는 구현이 있어, 코드를 모두 처음부터 독립 구현한 작업으로 소개하지는 않습니다.

[YouTube 재생목록](https://www.youtube.com/playlist?list=PL5zS4AjTJMs8wwZQyWds0j8TPxq3N_OpD)에서 영상 11편을 볼 수 있습니다. 알고리즘 설명을 다른 사람이 실행하고 따라갈 수 있는 형태로 정리한 경험입니다.

## 지금 상태

강의 영상과 노트, 예제 업로드는 완료했습니다. 실제 AMR에 통합한 계획기는 아니며, 예제의 출처·실행 환경 문서 보완은 남아 있습니다. 글 날짜는 저장소 생성일이며 자료는 이후 다시 확인해 정리했습니다.
