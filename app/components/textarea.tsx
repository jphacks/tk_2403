import { css } from '../../styled-system/css';

type Props = {
	placeholder: string;
};

export default function Textarea({ placeholder }: Props) {
	return (
		<textarea
			className={css({
				borderColor: 'border',
				borderRadius: 'md',
				borderWidth: '2px',
				w: 'full',
				height: '40',
				p: '3',
				fontSize: 'sm',
				_focus: {
					outline: 'none',
				},
			})}
			placeholder={placeholder}
		/>
	);
}
