import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import ImagePreview from '../../../components/imagePreview';
import Subtitle from '../../../components/subtitle';
import Textarea from '../../../components/textarea';
import { buttonStyle } from '../../../styles/button';
import { containerStyle } from '../../../styles/layout';

export const Route = createFileRoute('/_authed/guest/resister')({
	component: Page4,
});

function Page4() {
	const [deleteMode, setDeleteMode] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	const handleStart = () => {
		setErrorMessage('画像と自己紹介を入力してください。');
	};

	return (
		<div className={containerStyle()}>
			<h2
				className={css({
					mb: '24',
					color: 'text.muted',
					textAlign: 'center',
					fontSize: '[20px]',
					fontWeight: 'bold',
				})}
			>
				プロフィールを入力してください
			</h2>

			<div
				className={css({
					spaceY: '10',
					mb: '5',
				})}
			>
				<div>
					<div
						className={css({
							mb: '10',
						})}
					>
						<Subtitle text="顔写真" />
					</div>
					<ImagePreview deleteMode={deleteMode} />
				</div>

				<div
					className={css({
						display: 'flex',
						flexDirection: 'column',
					})}
				>
					<div
						className={css({
							mb: '1',
						})}
					>
						<Subtitle text="自己紹介" />
					</div>
					<Textarea placeholder="自己紹介を入力してください..." />
				</div>
			</div>

			{errorMessage && <p className={css({ mb: '4', color: 'alert' })}>{errorMessage}</p>}

			<button type="button" className={buttonStyle({ type: 'normal' })} onClick={handleStart}>
				はじめる
			</button>
		</div>
	);
}
