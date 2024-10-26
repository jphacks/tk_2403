import { createFileRoute } from '@tanstack/react-router'

import { css, cx } from '../../../../../../styled-system/css'
import ImagePreview from '../../../../../components/shared/ImagePreview'
import { containerStyle } from '../../../../../styles/layout'
import { buttonStyle } from '../../../../../styles/button'
import Subtitle from '../../../../../components/subtitle'
import Textarea from '../../../../../components/textarea'
import { InfoRow } from '../../../../../components/shared/infoRow'

export const Route = createFileRoute('/_authed/_registered/host/place/create')({
    component: Page18,
})

function Page18() {
    return (
        <div
            className={cx(
                containerStyle(),
                css({
                    spaceY: '16',
                }),
            )}
        >
            <h2
                className={css({
                    color: 'text.muted',
                    textAlign: 'center',
                    fontSize: 'xl',
                    fontWeight: 'bold',
                })}
            >
                プロフィールを入力してください
            </h2>

            <div>
                <Subtitle text="今回退避する家の写真" />
                <div
                    className={css({
                        py: '3',
                    })}
                >
                    <ImagePreview
                        houseImgList={[
                            'https://picsum.photos/id/337/200/300',
                            'https://picsum.photos/id/237/200/300',
                        ]}
                    />
                </div>
            </div>

            <div>
                <div
                    className={css({
                        mb: '3',
                    })}
                >
                    <Subtitle text="家の紹介文" />
                </div>
                <Textarea
                    placeholder="メルメル"
                    value=""
                    errors={[]}
                    onChange={() => { }}
                    onBlur={() => { }}
                />
            </div>

            <div
                className={css({
                    py: '[30px]',
                })}
            >
                <div
                    className={css({
                        mb: '3',
                    })}
                >
                    <Subtitle text="基本情報" />
                </div>
                <div
                    className={css({
                        borderTopWidth: '[1px]',
                        borderColor: 'border',
                    })}
                >
                    <InfoRow
                        label="家族構成"
                        value="4人家族"
                        placeholder="メルメル"
                        errors={[]}
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                    <InfoRow
                        label="ペットの有無"
                        value="無"
                        placeholder="メルメル"
                        errors={[]}
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                    <InfoRow label="提供可能期間" value="2024/10 - 2024/12"
                        placeholder="メルメル"
                        errors={[]}
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                    <InfoRow label="バリアフリー" value="有"
                        placeholder="メルメル"
                        errors={[]}
                        onChange={() => { }}
                        onBlur={() => { }}
                    />
                </div>
            </div>

            <button type="submit" className={buttonStyle({ type: 'normal' })}>
                作成する
            </button>
        </div>
    )
}
