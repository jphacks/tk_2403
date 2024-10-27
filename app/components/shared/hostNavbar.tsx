import { Link, useLocation } from '@tanstack/react-router';
import { FiFileText, FiHome, FiMessageSquare, FiUser } from 'react-icons/fi';
import type { IconType } from 'react-icons/lib';
import { css } from '../../../styled-system/css';

type NavItem = {
	name: string;
	href: string;
	activeForSubPath: boolean;
	icon: IconType;
};

const navItems: NavItem[] = [
	{
		name: 'ホーム',
		href: '/host',
		activeForSubPath: false,
		icon: FiHome,
	},
	{
		name: 'リクエスト',
		href: '/host/requests',
		activeForSubPath: true,
		icon: FiFileText,
	},
	{
		name: 'チャット',
		href: '/host/chat',
		activeForSubPath: true,
		icon: FiMessageSquare,
	},
	{
		name: 'プロフィール',
		href: '/host/profile',
		activeForSubPath: true,
		icon: FiUser,
	},
];

export default function HostNavbar() {
	const { pathname } = useLocation();

	return (
		<nav
			className={css({
				display: 'flex',
				position: 'sticky',
				left: '0',
				right: '0',
				bottom: '0',
				justifyContent: 'space-around',
				alignItems: 'center',
				borderTopWidth: '0.5px',
				borderColor: 'border',
				h: '[80px]',
				px: '2.5',
				pt: '3',
				pb: '7',
				bg: 'white',
			})}
		>
			{navItems.map((item) => (
				<NavItem
					key={item.href}
					name={item.name}
					href={item.href}
					isActive={isActive(pathname, item)}
					Icon={item.icon}
				/>
			))}
		</nav>
	);
}

function NavItem({ name, href, isActive, Icon }: { name?: string; href: string; isActive: boolean; Icon: IconType }) {
	return (
		<Link
			href={href}
			className={css({
				display: 'flex',
				gap: '0.5',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				alignItems: 'center',
				color: isActive ? 'primary' : 'text.muted',
				fontWeight: isActive ? 'bold' : 'normal',
			})}
		>
			<Icon size={20} fill={isActive ? 'currentColor' : 'none'} />
			{name && (
				<span
					className={css({
						fontSize: '[9px]',
					})}
				>
					{name}
				</span>
			)}
		</Link>
	);
}

const isActive = (pathname: string, item: NavItem) => {
	return pathname === item.href || (item.activeForSubPath && pathname.startsWith(`${item.href}/`));
};
