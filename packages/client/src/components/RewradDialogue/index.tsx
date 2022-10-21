import { createFromIconfontCN, HeartFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import style from './index.module.scss';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_3373608_fjjugrwddbs.js'],
});

export const RewradDialogue = () => {
  const t = useTranslations('rewardNamespace');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={style.reward}>
        <div className={style.rewardText}>{t('sponsorMe')}</div>
        <Button type="primary" className={style.rewardBtn} icon={<IconFont type="icon-renminbi" />} onClick={showModal}>
          {t('reward')}
        </Button>
      </div>
      <Modal
        key="reward"
        className={style.antModalBody}
        title={
          <span className={style.antModalTitle}>
            <HeartFilled style={{ color: 'rgb(224, 24, 74)' }} /> {t('thanks')}
          </span>
        }
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={350}
        destroyOnClose={true}
        getContainer={false}
      >
        <div className={style.rewardContainer}>
          <Image width="300" height="300" src="/Reward.webp" objectFit="cover" quality={100} />
        </div>
      </Modal>
    </>
  );
};
