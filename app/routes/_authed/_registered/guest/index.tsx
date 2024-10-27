import { createFileRoute } from '@tanstack/react-router';
import { css, cx } from '../../../../../styled-system/css';
import Header from '../../../../components/shared/header';
import SaftyofLevelColumn from '../../../../components/shared/saftyOfLevelColumn';
import UserNavbar from '../../../../components/shared/userNavbar';
import CardWithDangerBand from '../../../../components/shared/wantToBorrow/cardWithDangerBand';
import Subtitle from '../../../../components/subtitle';
import { getMyRequestsFnQueryKey } from '../../../../query/request';
import { getMyRequestsFn } from '../../../../server/request';
import { layoutStyle } from '../../../../styles/layout';
import { serverFnQuery } from '../../../../utils/client';

const getMyRequestsFnQuery = serverFnQuery(getMyRequestsFn);

export const Route = createFileRoute('/_authed/_registered/guest/')({
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			getMyRequestsFnQuery.serverQueryOptions({
				queryKey: getMyRequestsFnQueryKey,
				queryFn: (fn) => fn(),
			}),
		);
	},
	component: Guset,
});

function Guset() {
	const myRequestsQuery = getMyRequestsFnQuery.useQuery({
		queryKey: getMyRequestsFnQueryKey,
		queryFn: (fn) => fn(),
	});
	const requestingRequests = myRequestsQuery.data?.filter((request) => request.status === 'requesting') ?? [];
	const approvedRequests = myRequestsQuery.data?.filter((request) => request.status === 'approved') ?? [];
	const rejectedRequests = myRequestsQuery.data?.filter((request) => request.status === 'rejected') ?? [];

	return (
		<div
			className={css({
				h: 'full',
				bg: 'bg',
			})}
		>
			<Header title="Home" />
			<div
				className={cx(
					layoutStyle(),
					css({
						spaceY: '8',
					}),
				)}
			>
				<div>
					<div
						className={css({
							mb: '3',
						})}
					>
						<Subtitle text="今いる場所の安全度" />
					</div>
					<SaftyofLevelColumn type="permit" text="危険" address="東京都千代田区丸の内1丁目1-1" />
				</div>
				{requestingRequests.length > 0 && (
					<div>
						<div
							className={css({
								mb: '3',
							})}
						>
							<Subtitle text="リクエスト中の待避場所" />
						</div>
						{requestingRequests.map((request) => (
							<CardWithDangerBand
								key={request.evacuationPlaceId}
								placeId={request.evacuationPlaceId}
								type={request.area?.safety ?? 'safe'}
								address={request.evacuationPlace.address}
								houseName={request.evacuationPlace.profile.name}
								intro={request.evacuationPlace.description}
								houseImgList={request.evacuationPlace.pictureUrls}
							/>
						))}
					</div>
				)}
				{approvedRequests.length > 0 && (
					<div>
						<div
							className={css({
								mb: '3',
							})}
						>
							<Subtitle text="マッチングした待避場所" />
						</div>
						{approvedRequests.map((request) => (
							<CardWithDangerBand
								key={request.evacuationPlaceId}
								placeId={request.evacuationPlaceId}
								type={request.area?.safety ?? 'safe'}
								address={request.evacuationPlace.address}
								houseName={request.evacuationPlace.profile.name}
								intro={request.evacuationPlace.description}
								houseImgList={request.evacuationPlace.pictureUrls}
							/>
						))}
					</div>
				)}
				{rejectedRequests.length > 0 && (
					<div>
						<div
							className={css({
								mb: '3',
							})}
						>
							<Subtitle text="不成立のリクエスト" />
						</div>
						{rejectedRequests.map((request) => (
							<CardWithDangerBand
								key={request.evacuationPlaceId}
								placeId={request.evacuationPlaceId}
								type={request.area?.safety ?? 'safe'}
								address={request.evacuationPlace.address}
								houseName={request.evacuationPlace.profile.name}
								intro={request.evacuationPlace.description}
								houseImgList={request.evacuationPlace.pictureUrls}
							/>
						))}
					</div>
				)}
				<div>
					<div
						className={css({
							mb: '3',
						})}
					>
						<Subtitle text="お気に入り一覧" />
					</div>
					<CardWithDangerBand
						placeId={1}
						type="safe"
						address="〇〇県〇〇市"
						houseName="釘崎家"
						intro="初めまして、とみたです。よろしくお願いします。"
						houseImgList={[
							'https://placehold.jp/150x150.png',
							'https://placehold.jp/150x150.png',
							'https://placehold.jp/150x150.png',
						]}
					/>
				</div>
			</div>
			<UserNavbar />
		</div>
	);
}
