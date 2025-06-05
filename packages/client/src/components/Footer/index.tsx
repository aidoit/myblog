import { createFromIconfontCN } from '@ant-design/icons';
import { Popover } from 'antd';
import cls from 'classnames';
import Image from 'next/image';
import React from 'react';

import style from './index.module.scss';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_3373608_fjjugrwddbs.js'],
});

const content = (
  <>
    <div className={style.overlayStyle}>
      <Image src="/myWechatQRcode.webp" alt="扫一扫添加我的微信" width="75" height="73" />
    </div>
  </>
);

export const Footer = ({ setting, className = '', hasBg = false }) => {
  return (
    <footer className={cls(style.footer, className, hasBg && style.hasBg)}>
      <ul className={style.icons}>
        <li className={style.iconWechat}>
          <Popover
            overlayStyle={{ maxWidth: '110px', color: 'rgba(255, 255, 255, 0.45)' }}
            placement="bottom"
            title="微信扫一扫"
            content={content}
            arrowPointAtCenter
            autoAdjustOverflow
          >
            <IconFont type="icon-wechat" style={{ fontSize: '18px' }} />
          </Popover>
        </li>
        {/* <li className={style.iconWeibo}>
          <a
            aria-label="Weibo"
            className={style.github}
            href="https://weibo.com/208333150"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconFont type="icon-weibo" style={{ fontSize: '18px' }} />
          </a>
        </li> */}
        <li className={style.iconRss}>
          <a aria-label="rss" className={style.github} href="/rss" target="_blank" rel="noopener noreferrer">
            <IconFont type="icon-rss" style={{ fontSize: '18px' }} />
          </a>
        </li>
        {/* IPv6 Icon */}
      </ul>
      {setting && setting.systemFooterInfo && (
        <div
          className={style.copyright}
          dangerouslySetInnerHTML={{
            __html: setting.systemFooterInfo,
          }}
        ></div>
      )}
    </footer>
  );
};
