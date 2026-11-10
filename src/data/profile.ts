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
	desc: string;
	stack: string[];
	links: { label: string; href: string }[];
};

const gh = (repo: string) => ({ label: 'GitHub', href: `https://github.com/mach0312/${repo}` });

export const PROJECT_GROUPS: { title: string; items: Project[] }[] = [
	{
		title: 'Research code',
		items: [
			{
				name: 'omni-docking-bench',
				desc: 'ICROS 2026 논문의 재현 패키지. 3 cm 출발, 3 mm 수렴 기준의 근거리 도킹 벤치마크를 8방향 × 헤딩 오프셋 × 반복 격자로 돌려 제안 기구학 제어기와 Nav2 MPPI, DWB를 비교한다.',
				stack: ['ROS 2 Jazzy', 'Python', 'Docker'],
				links: [gh('omni-docking-bench')],
			},
			{
				name: 'payload_mass_estimator',
				desc: '주행 중 적재 질량을 온라인으로 추정하는 ROS 2 패키지. 직진 구간에서만 갱신하는 게이트, 구름 저항 보정, 유계 RLS로 신뢰도와 함께 추정값을 낸다.',
				stack: ['C++', 'ROS 2'],
				links: [gh('payload_mass_estimator')],
			},
		],
	},
	{
		title: 'Double-steering-drive platform',
		items: [
			{
				name: 'double_steering_drive_controller',
				desc: '이중 조향 구동(DSD) 플랫폼용 ros2_control 컨트롤러 플러그인.',
				stack: ['C++', 'ros2_control'],
				links: [gh('double_steering_drive_controller')],
			},
			{
				name: 'dsd_control_demo',
				desc: '같은 플랫폼의 하드웨어 인터페이스와 bringup.',
				stack: ['C++', 'ros2_control'],
				links: [gh('dsd_control_demo')],
			},
			{
				name: 'dsd_bot_description',
				desc: 'DSD 로봇의 URDF / xacro 기술.',
				stack: ['URDF', 'xacro'],
				links: [gh('dsd_bot_description')],
			},
		],
	},
	{
		title: 'Tools & teaching',
		items: [
			{
				name: 'pgv_tracing_mode',
				desc: 'PGV 라인 센서의 자세(x, y, yaw)로 라인 정렬, 주행, 미세 위치 보정을 하는 ROS 2 패키지. 홀로노믹과 비홀로노믹 플랫폼을 모두 지원한다.',
				stack: ['Python', 'ROS 2 Humble'],
				links: [gh('pgv_tracing_mode')],
			},
			{
				name: 'Sampling-Based-Planning_Tutorial',
				desc: 'RCI Lab(경희대학교) 강의 자료. PRM, RRT, RRT*, Informed RRT*, Connect-RRT를 Python으로 처음부터 구현했다.',
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
