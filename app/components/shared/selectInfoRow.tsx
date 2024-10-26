import { css } from '../../../styled-system/css';
import SelectFiled from './selectField'

type Props = {
	label: string;
	selectList: string[];
};

export default function SelectInfoRow({ label, selectList }: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderBottomWidth: '1px',
				borderColor: 'border',
				padding: '3',
				color: 'text.muted',
				fontSize: 'sm',
			})}
		>
			<div className={css({ flex: '1' })}>{label}</div>
			<div
				className={css({
					flex: '1',
					color: '[#f90]',
				})}
			>
				<SelectFiled selectList={selectList} />
			</div>
		</div>
	);
}
