import { createFromIconfontCN } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useMemo } from 'react';
import urllib from 'url';

import { GlobalContext } from '@/context/global';

import style from './index.module.scss';

export interface ShareProps {
  title: React.ReactNode;
  url: string;
}

export const Share: React.FC<ShareProps> = ({ title, url, children }) => {
  const t = useTranslations('shareNamespace');
  const { setting, locale } = useContext(GlobalContext);
  const systemUrl = setting.systemUrl || '';
  const fullUrl = useMemo(() => urllib.resolve(systemUrl, url), [systemUrl, url]);
  const IconFont = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/c/font_3373608_fjjugrwddbs.js'],
  });
  //分享菜单列表
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Button
              type="text"
              className={`${style.button} ${style.menuItem} ${style.shareMenuButton} ${style.buttonPlain}`}
              onClick={() => {
                copy(`${title} - ${locale}- ${fullUrl}`);
                message.success('链接复制成功');
              }}
            >
              <IconFont type="icon-link" className={style.shareMenuIconSmall} style={{ fontSize: '16px' }} />
              复制链接
            </Button>
          ),
          key: '0',
        },
        {
          type: 'divider',
        },
        // {
        //   label: (
        //     <Button
        //       type="text"
        //       className={`${style.button} ${style.menuItem} ${style.shareMenuButton} ${style.buttonPlain}`}
        //     >
        //       <IconFont
        //         type="icon-weibo"
        //         className={style.shareMenuIconSmall}
        //         style={{ color: '#E6162D', fontSize: '16px' }}
        //       />
        //       微博分享
        //     </Button>
        //   ),
        //   key: '1',
        // },
        // {
        //   type: 'divider',
        // },
        {
          label: (
            <div className={`${style.menuItem} ${style.share2Wechat} ${style.menuItemNoActive}`}>
              <Button type="text" className={`${style.button}  ${style.shareMenuButton} ${style.buttonPlain}`}>
                <IconFont
                  type="icon-wechat"
                  className={style.shareMenuIconSmall}
                  style={{ color: '#2AAE67', fontSize: '16px' }}
                />
                扫码分享
              </Button>
              <QRCodeSVG
                value={`${fullUrl}`}
                size={80}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                includeMargin={false}
                className={style.QRcodeImg}
              />
            </div>
          ),
          key: '2',
        },
      ]}
    />
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
        overlayClassName={`${style.popoverContent} ${style.popoverContentBottom} ${style.popoverContentArrowed}`}
      >
        <a onClick={(e) => e.preventDefault()}>
          {children || (
            <div className={style.wrap}>
              <svg
                viewBox="0 0 1025 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="0.9em"
                height="0.9em"
              >
                <path
                  d="M947.93816797 26.19122q16.57366084 12.05357168 13.56026748 32.14285751l-128.57142832 771.42857168q-2.51116084 14.56473252-16.07142832 22.60044668-7.03125 4.01785752-15.56919668 4.01785752-5.52455332 0-12.05357168-2.51116084l-227.51116084-92.91294668-121.54017833 148.15848252q-9.04017832 11.55133916-24.60937499 11.55133916-6.52901748 0-11.04910752-2.00892832-9.54241084-3.515625-15.31807998-11.80245498t-5.77567002-18.33147334l0-175.27901748 433.92857168-531.86383916-536.88616084 464.56473252-198.38169668-81.36160752q-18.58258916-7.03125-20.08928584-27.62276748-1.00446416-20.08928584 16.07142832-29.63169668l835.71428584-482.14285752q7.53348252-4.52008916 16.07142832-4.52008916 10.04464248 0 18.08035752 5.52455332z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          )}
        </a>
      </Dropdown>
    </>
  );
};
