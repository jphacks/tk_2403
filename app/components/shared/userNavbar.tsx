import { Link, useLocation } from '@tanstack/react-router';
import { FiHome, FiMessageSquare, FiSearch, FiUser } from 'react-icons/fi';
import type { IconType } from 'react-icons/lib';
import { css } from '../../../styled-system/css';

const navItems = [
	{
		name: 'ホーム',
		href: '/',
		icon: FiHome,
	},
	{
		name: '検索',
		href: '/search',
		icon: FiSearch,
	},
	{
		name: 'チャット',
		href: '/chat',
		icon: FiMessageSquare,
	},
	{
		name: 'プロフィール',
		href: '/profile',
		icon: FiUser,
	},
];

export default function UserNavbar() {
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
				borderTopWidth: '0.5px',
				borderColor: 'border',
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
					isActive={isActive(pathname, item.href)}
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

const isActive = (pathname: string, href: string) => {
	return pathname === href || pathname.startsWith(`${href}/`);
};
