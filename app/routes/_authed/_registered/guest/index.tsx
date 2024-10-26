import { createFileRoute } from '@tanstack/react-router'
import { css, cx } from '../../../../../styled-system/css'
import SaftyofLevelColumn from '../../../../components/shared/saftyOfLevelColumn'
import Header from '../../../../components/shared/header'
import Subtitle from '../../../../components/subtitle'
import UserNavbar from '../../../../components/shared/userNavbar'
import { layoutStyle } from '../../../../styles/layout'
import CardWithDangerBand from '../../../../components/shared/wantToBorrow/cardWithDangerBand'

export const Route = createFileRoute('/_authed/_registered/guest/')({
  component: Guset,
})

function Guset() {
  return (
    <div
      className={css({
        h: 'full',
        bg: 'bg',
      })}
    >
      <Header title="Home" />
      <div
        className={cx(
          layoutStyle(),
          css({
            spaceY: '8',
          }),
        )}
      >
        <div>
          <div
            className={css({
              mb: '3',
            })}
          >
            <Subtitle text="今いる場所の安全度" />
          </div>
          <SaftyofLevelColumn
            type="permit"
            text="危険"
            address="東京都千代田区丸の内1丁目1-1"
          />
        </div>
        <div>
          <div
            className={css({
              mb: '3',
            })}
          >
            <Subtitle text="承認済の家族" />
          </div>
          <CardWithDangerBand
            type="safe"
            address="〇〇県〇〇市"
            houseName="釘崎家"
            intro="初めまして、とみたです。よろしくお願いします。"
            houseImgList={[
              'https://placehold.jp/150x150.png',
              'https://placehold.jp/150x150.png',
              'https://placehold.jp/150x150.png',
            ]}
          />
        </div>
        <div>
          <div
            className={css({
              mb: '3',
            })}
          >
            <Subtitle text="お気に入り一覧" />
          </div>
          <CardWithDangerBand
            type="safe"
            address="〇〇県〇〇市"
            houseName="釘崎家"
            intro="初めまして、とみたです。よろしくお願いします。"
            houseImgList={[
              'https://placehold.jp/150x150.png',
              'https://placehold.jp/150x150.png',
              'https://placehold.jp/150x150.png',
            ]}
          />
        </div>
      </div>
      <UserNavbar />
    </div>
  )
}
