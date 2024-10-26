import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { FiSearch } from 'react-icons/fi';
import { css, cx } from '../../../../../../styled-system/css';
import Header from '../../../../../components/shared/header';
import UserNavbar from '../../../../../components/shared/userNavbar';
import CardWithDangerBand from '../../../../../components/shared/wantToBorrow/cardWithDangerBand';
import { layoutStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/guest/search/')({
	component: Page6,
});

function Page6() {
	const navigate = useNavigate();
	return (
		<div
			className={css({
				h: 'full',
				bg: 'bg',
			})}
		>
			<Header title="検索" />
			<div className={cx(layoutStyle(), css({ spaceY: '4' }))}>
				<div
					className={css({
						display: 'flex',
						alignItems: 'center',
						borderRadius: 'md',

						py: '2',
						px: '4',
						bg: 'white',
					})}
					onClick={() => navigate({ to: '/' })}
					onKeyUp={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							navigate({ to: '/' });
						}
					}}
				>
					<FiSearch className={css({ color: 'text.muted', fontSize: 'md' })} />
					<p
						className={css({
							ml: '2',
							color: 'text.muted',
							fontSize: 'sm',
						})}
					>
						物件を探す
					</p>
				</div>

				<div className={css({ spaceY: '3', mt: '5' })}>
					<CardWithDangerBand
						houseName="山田太郎"
						houseImgList={['https://picsum.photos/200/300', 'https://picsum.photos/200/301']}
						type="safe"
						address="東京都文京区大塚１‐１１‐１５"
						intro="非常に安全な地域に位置しています。"
					/>

					<CardWithDangerBand
						houseName="東海荘子"
						houseImgList={['https://picsum.photos/200/302', 'https://picsum.photos/200/303']}
						type="warn"
						address="大阪市中央区"
						intro="少し注意が必要ですが、便利なロケーションです。"
					/>

					<CardWithDangerBand
						houseName="沙羅氏広大"
						houseImgList={['https://picsum.photos/200/304', 'https://picsum.photos/200/305']}
						type="danger"
						address="横浜市神奈川区"
						intro="この地域は安全面でのリスクがあります。"
					/>
				</div>
			</div>
			<UserNavbar />
		</div>
	);
}
