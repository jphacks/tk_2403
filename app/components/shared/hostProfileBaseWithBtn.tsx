import type { ReactNode } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';

type Props = {
	children: ReactNode;
	text: string;
	requestStatus: 'requesting' | 'approved' | 'rejected';
	onApproveRequest: () => void;
	onRejectRequest: () => void;
};

export default function HostProfileBaseWithBtn({
	children,
	text,
	requestStatus,
	onApproveRequest,
	onRejectRequest,
}: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				flex: '1',
				flexDirection: 'column',
				roundedTop: '3xl',
				bg: 'white',
			})}
		>
			<div
				className={css({
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottomWidth: '2px',
					borderColor: 'border',
					p: '5',
				})}
			>
				<p
					className={css({
						color: 'warn',
						fontSize: '[14px]',
						fontWeight: 'bold',
					})}
				>
					{text}
				</p>
				{requestStatus === 'requesting' ? (
					<div className={css({ display: 'flex', gap: '2' })}>
						<button
							type="button"
							className={css({
								flexShrink: '0',
								borderColor: 'alert',
								rounded: 'md',
								borderWidth: '[2px]',
								p: '[calc(var(--spacing-2) - 2px)]',
								color: 'alert',
								fontSize: '[12px]',
							})}
							onClick={onRejectRequest}
						>
							却下する
						</button>
						<button
							type="button"
							className={css({
								flexShrink: '0',
								rounded: 'md',
								p: '2',
								color: 'white',
								fontSize: '[12px]',
								bg: 'primary',
							})}
							onClick={onApproveRequest}
						>
							承認する
						</button>
					</div>
				) : requestStatus === 'approved' ? (
					<button
						type="button"
						className={css({
							rounded: 'md',
							py: '2',
							px: '4',
							color: 'white',
							fontSize: '[12px]',
							bg: 'safe',
						})}
					>
						承認済み
					</button>
				) : (
					<button
						type="button"
						className={css({
							rounded: 'md',
							py: '2',
							px: '4',
							color: 'white',
							fontSize: '[12px]',
							bg: 'alert',
						})}
					>
						却下済み
					</button>
				)}
			</div>
			<div
				className={css({
					height: 'full',
					pt: '[30px]',
				})}
			>
				{children}
			</div>
		</div>
	);
}
