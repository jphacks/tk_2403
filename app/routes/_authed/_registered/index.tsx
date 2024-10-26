import { createFileRoute } from '@tanstack/react-router';
import { FaHouse } from 'react-icons/fa6';
import { GoPersonFill } from 'react-icons/go';
import { css } from '../../../../styled-system/css';
import Card from '../../../components/selectPage/Card';
import { containerStyle } from '../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/')({
	component: Home,
});

function Home() {
	return (
		<div className={containerStyle()}>
			<h2
				className={css({
					mb: '24',
					color: 'text.muted',
					textAlign: 'center',
					fontSize: '[24px]',
					fontWeight: 'black',
				})}
			>
				どちらで進めますか？
			</h2>
			<div
				className={css({
					spaceY: '5',
				})}
			>
				<Card color="primary" to="/guest/register">
					<GoPersonFill size={40} />
					退避先を探す
				</Card>
				<Card color="safe" to="/host/register">
					<FaHouse size={40} />
					退避先を提供する
				</Card>
			</div>
		</div>
	);
}
