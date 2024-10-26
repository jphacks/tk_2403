import { css } from '../../../styled-system/css';

export const InfoRow = ({ label, value }) => {
	return (
		<div
			className={css({
				display: 'flex',
				justifyContent: 'space-between',
				borderBottomWidth: '1px',
				borderColor: 'border',
				padding: '3',
				color: 'text.muted',
				fontSize: 'sm',
			})}
		>
			<div>{label}</div>
			<input
				className={css({
					color: 'primary',
					_focus: {
						outline: 'none',
					},
				})}
				value={value}
			/>
		</div>
	);
};
