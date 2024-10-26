import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { css } from '../../../styled-system/css';
import { containerStyle } from '../../styles/layout';
import { InfoRow } from '../../components/shared/infoRow';
import SelectInfoRow from '../../components/shared/selectInfoRow';

export const Route = createFileRoute('/_authed/register')({
  component: Register
})

function Register() {
	const [ageConfirmed, setAgeConfirmed] = useState(false);
	const [termsAgreed, setTermsAgreed] = useState(false);

	return (
		<div className={containerStyle()}>
			<h2
				className={css({
					mb: '20',
					color: 'text.muted',
					textAlign: 'center',
					fontSize: 'xl',
					fontWeight: 'bold',
				})}
			>
				二次待避君へようこそ
			</h2>
			<div
				className={css({
					borderTopWidth: '1px',
					borderColor: 'border',
					width: 'full',
					mb: '8',
					backgroundColor: 'white',
				})}
			>
				<InfoRow label="名前" value="高井戸" />
				<SelectInfoRow selectList={['男', '女', 'その他']} label="性別" />
				<InfoRow label="生年月日" value="2003/4/11" />
				<InfoRow label="移住地" value="金沢市輪島" />
				<InfoRow label="メールアドレス" value="maruma@gmail.com" />
			</div>
			<div
				className={css({
					width: 'full',
				})}
			>
				<p
					className={css({
						mb: '[120px]',
						paddingLeft: '2',
						color: 'text.muted',
						fontSize: 'sm',
					})}
				>
					ニックネーム、居住地、メールアドレスは後から変更可能です。
				</p>

				<div
					className={css({
						display: 'flex',
						gap: '2',
						alignItems: 'start',
						mb: '2',
					})}
				>
					<input
						type="checkbox"
						checked={ageConfirmed}
						onChange={(e) => setAgeConfirmed(e.currentTarget.checked)}
						className={css({
							width: '5',
							height: '5',
						})}
					/>
					<p
						className={css({
							width: 'full',
							color: 'text',
							fontSize: 'sm',
							wordWrap: 'break-word',
						})}
					>
						私は18歳以上です。
					</p>
				</div>

				<div
					className={css({
						display: 'flex',
						gap: '2',
						alignItems: 'start',
						mb: '10',
					})}
				>
					<input
						type="checkbox"
						checked={termsAgreed}
						onChange={(e) => setTermsAgreed(e.currentTarget.checked)}
						className={css({
							width: '5',
							height: '5',
						})}
					/>
					<p
						className={css({
							width: 'full',
							color: 'text',
							fontSize: 'sm',
							wordWrap: 'break-word',
						})}
					>
						二次待避くんの
						<span className={css({ color: 'primary', fontSize: 'sm' })}>利用規約・プライバシーポリシー</span>
						の内容を確認のうえ、同意します。
					</p>
				</div>

				<button
					type="button"
					className={css({
						border: 'none',
						borderRadius: 'md',
						width: 'full',
						padding: '3',
						color: 'text.muted',
						fontSize: 'sm',
						fontWeight: 'bold',
						backgroundColor: 'border',
						cursor: ageConfirmed && termsAgreed ? 'pointer' : 'not-allowed',
					})}
					disabled={!ageConfirmed || !termsAgreed}
				>
					二次待避くんをはじめる
				</button>
			</div>
		</div>
	);
}
