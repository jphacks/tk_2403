import { createFileRoute, notFound } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { useState } from 'react';
import { css } from '../../../../../../styled-system/css';
import ImagePreview from '../../../../../components/shared/ImagePreview';
import Header from '../../../../../components/shared/header';
import HostNavbar from '../../../../../components/shared/hostNavbar';
import HostProfileBaseWithBtn from '../../../../../components/shared/hostProfileBaseWithBtn';
import Subtitle from '../../../../../components/subtitle';
import { approveRequestFn, getRequestFn, rejectRequestFn } from '../../../../../server/request';
import { profileContainerStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/host/requests/$requestId')({
	loader: async ({ params }) => {
		const request = await getRequestFn({
			requestId: Number.parseInt(params.requestId),
		});
		if (request === undefined) {
			throw notFound();
		}
		return { request };
	},
	component: PlaceDetail,
});

function PlaceDetail() {
	const { request } = Route.useLoaderData();
	const approveRequest = useServerFn(approveRequestFn);
	const rejectRequest = useServerFn(rejectRequestFn);
	const [requestStatus, setRequestStatus] = useState(request.status);

	return (
		<div
			className={css({
				bg: 'bg',
			})}
		>
			<Header title={request.profile.name} />
			<div className={profileContainerStyle()}>
				<div
					className={css({
						py: '[30px]',
					})}
				>
					<ImagePreview houseImgList={request.profile.pictureUrls} />
				</div>
				<HostProfileBaseWithBtn
					text={`${request.profile.name}・${request.profile.dateOfBirth.split('-')[0]}年生まれ${request.profile.gender !== 'other' ? `・${request.profile.gender === 'male' ? '男' : '女'}` : ''}`}
					requestStatus={requestStatus}
					onApproveRequest={async () => {
						await approveRequest({ requestId: request.id });
						setRequestStatus('approved');
					}}
					onRejectRequest={async () => {
						await rejectRequest({ requestId: request.id });
						setRequestStatus('rejected');
					}}
				>
					<div
						className={css({
							display: 'flex',
							flex: '1',
							flexDirection: 'column',
							justifyContent: 'space-between',
						})}
					>
						<div
							className={css({
								py: '[30px]',
								px: '[15px]',
							})}
						>
							<div
								className={css({
									mb: '2',
								})}
							>
								<Subtitle text="自己紹介" />
							</div>
							<p
								className={css({
									color: 'text.muted',
								})}
							>
								{request.profile.biography}
							</p>
						</div>
					</div>
				</HostProfileBaseWithBtn>
			</div>
			<HostNavbar />
		</div>
	);
}
