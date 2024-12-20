import { css } from '../../../styled-system/css';
import Tag from './tag';

type Props = {
	address: string;
	type: 'permit' | 'beforePermit' | 'reject';
	text: string;
};

export default function SaftyofLevelColumn({ address, type, text }: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				rounded: 'md',
				p: '[15px]',
				bg: 'white',
			})}
		>
			<p className={css({ flex: '1', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' })}>
				{address}
			</p>
			<Tag type={type} text={text} />
		</div>
	);
}
