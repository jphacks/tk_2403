import * as Tabs from '@radix-ui/react-tabs';
import { createFileRoute } from '@tanstack/react-router';
import { css, cx } from '../../../../../../styled-system/css';
import Header from '../../../../../components/shared/header';
import HostNavbar from '../../../../../components/shared/hostNavbar';
import Tab from '../../../../../components/shared/tab';
import CardWithTag from '../../../../../components/shared/wantToLend/cardWithTag';
import { getRecievedRequestsFn } from '../../../../../server/request';
import { layoutStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/host/requests/')({
	loader: async () => {
		const requests = await getRecievedRequestsFn();
		return { requests };
	},
	component: Requests,
});

function Requests() {
	const { requests } = Route.useLoaderData();

	return (
		<div className={css({ h: 'full', bg: 'bg' })}>
			<Header title="リクエスト一覧" />
			<div className={cx(layoutStyle(), css({ spaceY: '4' }))}>
				<Tab>
					<Tabs.Content className={css({ spaceY: '4', mt: '5' })} value="すべて">
						{requests.map((request) => (
							<CardWithTag
								key={request.id}
								requestId={request.id}
								houseName={request.profile.name}
								houseImgList={request.profile.pictureUrls}
								intro={request.profile.biography}
								type={
									request.status === 'approved' ? 'permit' : request.status === 'rejected' ? 'reject' : 'beforePermit'
								}
								text={request.status === 'approved' ? '承認済' : request.status === 'rejected' ? '却下済み' : '承認前'}
							/>
						))}
					</Tabs.Content>
					<Tabs.Content className={css({ spaceY: '4', mt: '5' })} value="承認前">
						{requests
							.filter((request) => request.status === 'requesting')
							.map((request) => (
								<CardWithTag
									key={request.id}
									requestId={request.id}
									houseName={request.profile.name}
									houseImgList={request.profile.pictureUrls}
									intro={request.profile.biography}
									type={
										request.status === 'approved' ? 'permit' : request.status === 'rejected' ? 'reject' : 'beforePermit'
									}
									text={
										request.status === 'approved' ? '承認済' : request.status === 'rejected' ? '却下済み' : '承認前'
									}
								/>
							))}
					</Tabs.Content>
					<Tabs.Content className={css({ spaceY: '4', mt: '5' })} value="承認済み">
						{requests
							.filter((request) => request.status === 'approved')
							.map((request) => (
								<CardWithTag
									key={request.id}
									requestId={request.id}
									houseName={request.profile.name}
									houseImgList={request.profile.pictureUrls}
									intro={request.profile.biography}
									type={
										request.status === 'approved' ? 'permit' : request.status === 'rejected' ? 'reject' : 'beforePermit'
									}
									text={
										request.status === 'approved' ? '承認済' : request.status === 'rejected' ? '却下済み' : '承認前'
									}
								/>
							))}
					</Tabs.Content>
				</Tab>
			</div>
			<HostNavbar />
		</div>
	);
}
