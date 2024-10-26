import { css } from '../../../styled-system/css';
import Tag from './tag';

type Props = {
	address: string;
	type: 'permit' | 'beforePermit' | 'reject';
	text: string;
};

export default function SaftyofLevelColumn({ address, type, text }: Props) {
	const truncatedAddress = address.length > 10 ? `${address.slice(0, 10)}...` : address;

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
			<p>{truncatedAddress}</p>
			<Tag type={type} text={text} />
		</div>
	);
}
