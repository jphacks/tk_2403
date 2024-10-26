import { Link, createFileRoute } from '@tanstack/react-router';
import { FiPlus } from 'react-icons/fi';
import { css, cx } from '../../../../../styled-system/css';
import Header from '../../../../components/shared/header';
import HostNavbar from '../../../../components/shared/hostNavbar';
import SaftyofLevelColumn from '../../../../components/shared/saftyOfLevelColumn';
import Card from '../../../../components/shared/wantToLend/card';
import CardWithDangerBandAndStar from '../../../../components/shared/wantToLend/cardWithDangerBandAndStar';
import Subtitle from '../../../../components/subtitle';
import { getMyEvacuationPlaceFnQueryKey } from '../../../../query/evacuationPlace';
import { getMyEvacuationPlaceFn } from '../../../../server/evacuationPlace';
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
					<SaftyofLevelColumn type="permit" text="安全" address="東京都千代田区丸の内1丁目1-1" />
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
