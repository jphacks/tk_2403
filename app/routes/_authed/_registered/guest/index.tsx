import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { css, cx } from '../../../../../styled-system/css';
import Header from '../../../../components/shared/header';
import SaftyofLevelColumn from '../../../../components/shared/saftyOfLevelColumn';
import UserNavbar from '../../../../components/shared/userNavbar';
import CardWithDangerBand from '../../../../components/shared/wantToBorrow/cardWithDangerBand';
import Subtitle from '../../../../components/subtitle';
import { getFavoritesFnQueryKey } from '../../../../query/favorite';
import { locationDataQueryKey } from '../../../../query/geocoding';
import { getMyRequestsFnQueryKey } from '../../../../query/request';
import { getFavoritesFn } from '../../../../server/favorite';
import { getLocationDataFn } from '../../../../server/geocoding';
import { getMyRequestsFn } from '../../../../server/request';
import { layoutStyle } from '../../../../styles/layout';
import { serverFnQuery } from '../../../../utils/client';

const getMyRequestsFnQuery = serverFnQuery(getMyRequestsFn);
const getFavoritesFnQuery = serverFnQuery(getFavoritesFn);

export const Route = createFileRoute('/_authed/_registered/guest/')({
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			getMyRequestsFnQuery.serverQueryOptions({
				queryKey: getMyRequestsFnQueryKey,
				queryFn: (fn) => fn(),
			}),
		);
		await context.queryClient.prefetchQuery(
			getFavoritesFnQuery.serverQueryOptions({
				queryKey: getFavoritesFnQueryKey,
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
	const favoritesQuery = getFavoritesFnQuery.useQuery({
		queryKey: getFavoritesFnQueryKey,
		queryFn: (fn) => fn(),
	});
	const getLocationData = useServerFn(getLocationDataFn);
	const locationDataQuery = useQuery({
		queryKey: locationDataQueryKey,
		queryFn: async () => {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				});
			});
			return await getLocationData({ lat: position.coords.latitude, lng: position.coords.longitude });
		},
	});
	const safetyMap = {
		safe: { type: 'permit', label: '安全' } as const,
		caution: { type: 'beforePermit', label: '少し危険' } as const,
		danger: { type: 'reject', label: '危険' } as const,
	};

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
					{locationDataQuery.isLoading ? (
						<p>Loading...</p>
					) : locationDataQuery.data?.address !== undefined ? (
						<SaftyofLevelColumn
							type={safetyMap[locationDataQuery.data.area?.safety ?? 'safe'].type}
							text={safetyMap[locationDataQuery.data.area?.safety ?? 'safe'].label}
							address={locationDataQuery.data.address}
						/>
					) : (
						<p>位置情報の取得に失敗しました。ブラウザの設定を確認してください。</p>
					)}
				</div>
				{requestingRequests.length > 0 && (
					<div>
						<div
							className={css({
								mb: '3',
							})}
						>
							<Subtitle text="リクエスト中の退避場所" />
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
								isFavorite={request.evacuationPlace.isFavorite}
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
							<Subtitle text="マッチングした退避場所" />
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
								isFavorite={request.evacuationPlace.isFavorite}
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
								isFavorite={request.evacuationPlace.isFavorite}
							/>
						))}
					</div>
				)}
				{(favoritesQuery.data ?? []).length > 0 && (
					<div>
						<div
							className={css({
								mb: '3',
							})}
						>
							<Subtitle text="お気に入り一覧" />
						</div>
						{favoritesQuery.data?.map((favorite) => (
							<CardWithDangerBand
								key={favorite.id}
								placeId={favorite.evacuationPlace.id}
								type={favorite.area?.safety ?? 'safe'}
								address={favorite.evacuationPlace.address}
								houseName={favorite.evacuationPlace.profile.name}
								intro={favorite.evacuationPlace.description}
								houseImgList={favorite.evacuationPlace.pictureUrls}
								isFavorite={true}
							/>
						))}
					</div>
				)}
			</div>
			<UserNavbar />
		</div>
	);
}
