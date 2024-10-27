import type { ReactNode } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';

type Props = {
	children: ReactNode;
	text: string;
	requestStatus: 'requesting' | 'approved' | 'rejected' | null;
	onCreateRequest: () => void;
	onCancelRequest: () => void;
};

export default function ProfileBaseWithBtn({ children, text, requestStatus, onCreateRequest, onCancelRequest }: Props) {
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
				{requestStatus === null ? (
					<button
						type="button"
						className={css({
							borderColor: 'primary',
							rounded: 'md',
							borderWidth: '[2px]',
							py: '[calc(var(--spacing-2) - 2px)]',
							px: '[calc(var(--spacing-4) - 2px)]',
							color: 'primary',
							fontSize: '[12px]',
						})}
						onClick={onCreateRequest}
					>
						申請する
					</button>
				) : requestStatus === 'requesting' ? (
					<button
						type="button"
						className={css({
							rounded: 'md',
							py: '2',
							px: '4',
							color: 'white',
							fontSize: '[12px]',
							bg: 'primary',
						})}
						onClick={onCancelRequest}
					>
						申請中
					</button>
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
						マッチ成立
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
						不成立
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
