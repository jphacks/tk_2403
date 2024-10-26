import * as Tabs from '@radix-ui/react-tabs';
import { createFileRoute } from '@tanstack/react-router';
import { css, cx } from '../../../../../styled-system/css';
import Header from '../../../../components/shared/header';
import HostNavbar from '../../../../components/shared/hostNavbar';
import Tab from '../../../../components/shared/tab';
import CardWithTag from '../../../../components/shared/wantToLend/cardWithTag';
import { layoutStyle } from '../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/host/requests')({
	component: Page6,
});

function Page6() {
	return (
		<div className={css({ h: 'full', bg: 'bg' })}>
			<Header title="リクエスト一覧" />
			<div className={cx(layoutStyle(), css({ spaceY: '4' }))}>
				<Tab>
					<Tabs.Content className={css({ spaceY: '4', mt: '5' })} value="すべて">
						<CardWithTag
							houseName="許可された家"
							houseImgList={[
								'https://picsum.photos/200/300',
								'https://picsum.photos/200/301',
								'https://picsum.photos/200/302',
							]}
							type="permit"
							text="承認済"
						/>
					</Tabs.Content>
					<Tabs.Content className={css({ spaceY: '4', mt: '5' })} value="認証前">
						<CardWithTag
							houseName="許可された家"
							houseImgList={[
								'https://picsum.photos/200/300',
								'https://picsum.photos/200/301',
								'https://picsum.photos/200/302',
							]}
							type="permit"
							text="承認済"
						/>

						<CardWithTag
							houseName="許可前の家"
							houseImgList={['https://picsum.photos/200/302', 'https://picsum.photos/200/304']}
							type="beforePermit"
							text="承認前"
						/>

						<CardWithTag
							houseName="却下された家"
							houseImgList={[
								'https://picsum.photos/200/304',
								'https://picsum.photos/200/305',
								'https://picsum.photos/200/305',
							]}
							type="reject"
							text="却下"
						/>
					</Tabs.Content>
				</Tab>
			</div>
			<HostNavbar />
		</div>
	);
}
