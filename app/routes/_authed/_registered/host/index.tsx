import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { FiPlus } from 'react-icons/fi';
import { css, cx } from '../../../../../styled-system/css';
import Header from '../../../../components/shared/header';
import HostNavbar from '../../../../components/shared/hostNavbar';
import SaftyofLevelColumn from '../../../../components/shared/saftyOfLevelColumn';
import Card from '../../../../components/shared/wantToLend/card';
import CardWithDangerBandAndStar from '../../../../components/shared/wantToLend/cardWithDangerBandAndStar';
import Subtitle from '../../../../components/subtitle';
import { getMyEvacuationPlaceFnQueryKey } from '../../../../query/evacuationPlace';
import { locationDataQueryKey } from '../../../../query/geocoding';
import { getMyEvacuationPlaceFn } from '../../../../server/evacuationPlace';
import { getLocationDataFn } from '../../../../server/geocoding';
import { getRecievedRequestsFn } from '../../../../server/request';
import { layoutStyle } from '../../../../styles/layout';
import { serverFnQuery } from '../../../../utils/client';

const getMyEvacuationPlaceFnQuery = serverFnQuery(getMyEvacuationPlaceFn);

export const Route = createFileRoute('/_authed/_registered/host/')({
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			getMyEvacuationPlaceFnQuery.serverQueryOptions({
				queryKey: getMyEvacuationPlaceFnQueryKey,
				queryFn: (fn) => fn(),
			}),
		);
		const requests = await getRecievedRequestsFn();
		return { requests };
	},
	component: Host,
});

function Host() {
	const { requests } = Route.useLoaderData();
	const approvedRequests = requests.filter((request) => request.status === 'approved');
	const myEvacuationPlaceQuery = getMyEvacuationPlaceFnQuery.useQuery({
		queryKey: getMyEvacuationPlaceFnQueryKey,
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
				bg: 'bg',
			})}
		>
			<Header title="Home" />
			<main
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
							mb: '[15px]',
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

				{approvedRequests.length > 0 && (
					<div>
						<div
							className={css({
								mb: '[15px]',
							})}
						>
							<Subtitle text="マッチングした避難者" />
						</div>
						{approvedRequests.map((request) => (
							<Card
								key={request.id}
								requestId={request.id}
								houseName={request.profile.name}
								houseImgList={request.profile.pictureUrls}
								intro={request.profile.biography}
							/>
						))}
					</div>
				)}

				<div>
					<div
						className={css({
							mb: '[15px]',
						})}
					>
						<Subtitle text="提供する退避場所" />
					</div>
					{myEvacuationPlaceQuery.data !== undefined ? (
						<CardWithDangerBandAndStar
							type={myEvacuationPlaceQuery.data.area?.safety ?? 'safe'}
							address={myEvacuationPlaceQuery.data.address}
							houseName={myEvacuationPlaceQuery.data.profile.name}
							intro={myEvacuationPlaceQuery.data.description}
							houseImgList={myEvacuationPlaceQuery.data.pictureUrls}
						/>
					) : (
						<Link
							to="/host/place/create"
							className={css({
								display: 'block',
								borderColor: 'text.muted',
								rounded: 'md',
								borderWidth: '[1px]',
								py: '[65px]',
								textAlign: 'center',
							})}
						>
							<FiPlus
								size={82}
								className={css({
									mx: 'auto',
									mb: '[10px]',
									color: 'text.muted',
								})}
							/>
							<p
								className={css({
									color: 'text.muted',
									fontSize: '[20px]',
								})}
							>
								提供場所を追加する
							</p>
						</Link>
					)}
				</div>
			</main>
			<HostNavbar />
		</div>
	);
}
