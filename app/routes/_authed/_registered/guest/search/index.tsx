import { Link, createFileRoute, useLocation } from '@tanstack/react-router';
import { FiSearch } from 'react-icons/fi';
import { css } from '../../../../../../styled-system/css';
import Header from '../../../../../components/shared/header';
import UserNavbar from '../../../../../components/shared/userNavbar';
import CardWithDangerBand from '../../../../../components/shared/wantToBorrow/cardWithDangerBand';
import { createGetEvacuationPlacesFnQueryKey } from '../../../../../query/evacuationPlace';
import { getEvacuationPlacesFn } from '../../../../../server/evacuationPlace';
import { layoutStyle } from '../../../../../styles/layout';
import { serverFnQuery } from '../../../../../utils/client';

const getEvacuationPlacesFnQuery = serverFnQuery(getEvacuationPlacesFn);

export const Route = createFileRoute('/_authed/_registered/guest/search/')({
	loader: async ({ location, context }) => {
		await context.queryClient.prefetchQuery(
			getEvacuationPlacesFnQuery.serverQueryOptions({
				queryKey: createGetEvacuationPlacesFnQueryKey(location.search),
				// biome-ignore lint/suspicious/noExplicitAny:
				queryFn: (fn) => fn(location.search as any),
			}),
		);
	},
	component: Search,
});

function Search() {
	const location = useLocation();
	const evacuationPlacesQuery = getEvacuationPlacesFnQuery.useQuery({
		queryKey: createGetEvacuationPlacesFnQueryKey(location.search),
		// biome-ignore lint/suspicious/noExplicitAny:
		queryFn: (fn) => fn(location.search as any),
	});

	return (
		<div
			className={css({
				h: 'full',
				bg: 'bg',
			})}
		>
			<Header title="検索" />
			<div className={css(layoutStyle.raw(), { spaceY: '4' })}>
				<Link
					to="/guest/search/filter"
					search={location.search}
					className={css({
						display: 'flex',
						alignItems: 'center',
						borderRadius: 'md',
						py: '2',
						px: '4',
						bg: 'white',
					})}
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
				</Link>

				<div className={css({ spaceY: '3', mt: '5' })}>
					{evacuationPlacesQuery.data?.map((evacuationPlace) => (
						<CardWithDangerBand
							key={evacuationPlace.id}
							houseName={evacuationPlace.profile.name}
							houseImgList={evacuationPlace.pictureUrls}
							type={evacuationPlace.area?.safety ?? 'safe'}
							address={evacuationPlace.address}
							intro={evacuationPlace.description}
						/>
					))}
				</div>
			</div>
			<UserNavbar />
		</div>
	);
}
