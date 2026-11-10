// 소개 페이지와 프로젝트 페이지에 들어가는 사실 목록. 근거가 확인된 내용만 넣는다.

export const FACTS = [
	{ label: '소속', value: '피트인(PIT-IN) 연구원' },
	{ label: '학업', value: '경희대학교 기계공학과 석사과정 · RCI Lab' },
	{ label: '관심', value: '이동로봇 기구학과 제어, 샘플링 기반 계획과 MPC, mm 단위 정밀 도킹' },
];

export type Publication = {
	year: number;
	kind: 'Journal' | 'Conference';
	title: string;
	titleEn?: string;
	authors: string[];
	venue: string;
	status?: string;
	links: { label: string; href: string }[];
};

// 본인 이름은 목록에서 굵게 표시된다.
export const SELF_NAMES = ['손재락', 'J.-R. Son'];

export const PUBLICATIONS: Publication[] = [
	{
		year: 2026,
		kind: 'Journal',
		title: '유계 참조 보상과 조향률 제약을 통한 이중 조향 이동로봇의 정밀 도킹 성능 개선',
		titleEn:
			'Improving Precision Docking of a Double-Steering Mobile Robot Using Bounded Reference Compensation and Steering-Rate Constraints',
		authors: ['손재락', '심재훈', '김상현'],
		venue: '제어·로봇·시스템학회 논문지 (JICROS)',
		status: '게재 예정',
		links: [],
	},
	{
		year: 2026,
		kind: 'Conference',
		title:
			'Analysis of fine-convergence limitations in Nav2 omnidirectional controllers and a kinematics-based convergence controller',
		authors: ['J.-R. Son', 'J.-H. Sim', 'S.-H. Kim'],
		venue: 'Proc. of the 41st ICROS Annual Conference (ICROS 2026), Daegu, Korea, Jul. 2026',
		links: [{ label: 'Code', href: 'https://github.com/mach0312/omni-docking-bench' }],
	},
];

export type Project = {
	name: string;
	/** 완성도를 한눈에 보여 주는 짧은 표시. 예: Merged, 현장 운용 중 */
	status: string;
	desc: string;
	stack: string[];
	links: { label: string; href: string }[];
	/** 링크를 걸 수 없는 비공개 작업일 때 링크 자리에 보이는 문구 */
	privateNote?: string;
};

const gh = (repo: string) => ({ label: 'GitHub', href: `https://github.com/mach0312/${repo}` });

// 끝까지 마친 작업만 넣는다: upstream 머지, 논문 공개 자료, 현장 운용, 강의 완료.
// 넣지 않는 것: 커밋이 며칠에 몰리고 멈춘 저장소, README가 비어 있는 저장소,
// 회사 저장소로 옮겨 가고 멈춘 옛 공개본, 아직 개발 중인 회사 일.
export const PROJECT_GROUPS: { title: string; items: Project[] }[] = [
	{
		title: 'Open source',
		items: [
			{
				name: 'Nav2 collision monitor',
				status: 'Merged',
				desc: '홀로노믹 로봇이 옆으로만 움직일 때(vx = 0) 속도 다각형 판정이 x 속도만 보고 범위 밖으로 처리해, 주행 중인데도 정지 상태용 다각형에 머물던 문제를 고쳤다. 홀로노믹이면 속도 크기로 판정하도록 바꾸고 테스트와 공식 튜토리얼 문서도 함께 고쳤다. main에 머지됐고 Jazzy 1.3.12부터 릴리스에 들어갔다.',
				stack: ['C++', 'ROS 2', 'Nav2'],
				links: [
					{ label: 'PR #5954', href: 'https://github.com/ros-navigation/navigation2/pull/5954' },
					{ label: 'Docs #871', href: 'https://github.com/ros-navigation/docs.nav2.org/pull/871' },
				],
			},
		],
	},
	{
		title: 'Research',
		items: [
			{
				name: 'omni-docking-bench',
				status: 'v0.1.0 공개',
				desc: 'ICROS 2026 논문의 재현 패키지. 3 cm 출발, 3 mm 수렴 기준의 근거리 도킹 벤치마크를 8방향 × 헤딩 오프셋 × 반복 격자로 돌려 제안 기구학 제어기와 Nav2 MPPI, DWB를 비교한다.',
				stack: ['ROS 2 Jazzy', 'Python', 'Docker'],
				links: [gh('omni-docking-bench')],
			},
		],
	},
	{
		title: 'Work · 피트인',
		items: [
			{
				name: '배터리 이송 AGV 제어 프로그램',
				status: '현장 운용 중',
				desc: '안양 배터리 교체 스테이션에서 매일 쓰이는 배터리 이송 로봇(AGV 1~3호기)의 제어 프로그램을 동료와 함께 개발했다. 내가 맡은 부분은 조이스틱 수동 조작, ROS 2 연동과 관제 서버 연결 감시, 날짜별 운영 로그, 관제 서버의 작업 즉시 취소 명령이다. 비전 쪽에서는 카메라 USB 장애로 USB 호스트 컨트롤러가 멈추면 재부팅 없이 되살리는 복구 데몬을 만들었고, 3호기에서 상시 동작 중이다.',
				stack: ['Python', 'ROS 2', 'rosbridge', 'systemd'],
				links: [],
				privateNote: '회사 비공개 저장소',
			},
		],
	},
	{
		title: 'Teaching',
		items: [
			{
				name: 'Sampling-Based-Planning_Tutorial',
				status: '강의 영상 11편',
				desc: 'RCI Lab(경희대학교) 강의 자료. PRM, RRT, RRT*, Informed RRT*, Connect-RRT를 Python으로 처음부터 구현하고 영상 강의로 설명했다.',
				stack: ['Python'],
				links: [
					gh('Sampling-Based-Planning_Tutorial'),
					{
						label: 'YouTube',
						href: 'https://youtube.com/playlist?list=PL5zS4AjTJMs8wwZQyWds0j8TPxq3N_OpD',
					},
				],
			},
		],
	},
];
