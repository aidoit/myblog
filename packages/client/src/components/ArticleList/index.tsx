import { createFromIconfontCN, HeartFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import LazyLoad from 'react-lazyload';

import { LocaleTime } from '@/components/LocaleTime';
import { Share } from '@/components/Share';

import style from './index.module.scss';

interface IProps {
  articles: IArticle[];
  coverHeight?: number;
  asRecommend?: boolean;
}

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_3373608_fjjugrwddbs.js'],
});

export const ArticleList: React.FC<IProps> = ({ articles = [] }) => {
  const t = useTranslations();

  return (
    <div className={style.wrapper}>
      {articles && articles.length ? (
        articles.map((article) => {
          return (
            <div key={article.id} className={style.articleItem}>
              <header>
                <Link href={`/post/[id]`} as={`/post/${article.id}`} scroll={false}>
                  <a aria-label={article.title}>
                    <div className={style.title}>{article.title}</div>{' '}
                  </a>
                </Link>
                <div className={style.info}>
                  {/* S 文章分类 */}
                  {article.category && (
                    <>
                      <span className={style.time}>{article.category.label}</span>
                    </>
                  )}
                  {/* E 文章分类 */}
                  <Divider type="vertical" />
                  {/* S 发布时间 */}
                  <span className={style.time}>
                    <LocaleTime date={article.publishAt} timeago={true} />
                  </span>
                  {/* E 发布时间 */}
                  <Divider type="vertical" />
                  {/* S 文章标签 */}
                  {article.tags && article.tags.length ? (
                    <div className={style.tagsWrap}>
                      {article.tags.map((tag) => {
                        return (
                          <div className={style.tagWrapper} key={tag.id}>
                            <div className={style.tag}>
                              <Link href={'/tag/[tag]'} as={'/tag/' + tag.value} scroll={false}>
                                <a aria-label={tag.label}>
                                  <span>{tag.label}</span>
                                </a>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  {/* E 文章标签 */}
                </div>
              </header>
              <main>
                <div className={style.contentWrapper}>
                  <div className={style.desc}>{article.summary}</div>
                  <div className={style.meta}>
                    {/* S 点赞次数 */}
                    <span>
                      {/* <IconFont type="icon-thumbup" /> */}
                      <HeartFilled />
                      <span className={style.number}>{article.likes}</span>
                    </span>
                    {/* E 点赞次数 */}
                    <span className={style.seperator}></span>
                    {/* S 查看次数 */}
                    <span>
                      <IconFont type="icon-preview" />
                      <span className={style.number}>{article.views}</span>
                    </span>
                    {/* E 查看次数 */}
                    <span className={style.seperator}></span>
                    {/* S 分享按钮 */}
                    {/* <IconFont type="icon-paperplane" /> */}
                    <Share title={article.title} url={`/post/${article.id}`}>
                      <span>
                        <IconFont type="icon-paperplane" />
                        <span className={style.number}>{t('share')}</span>
                      </span>
                    </Share>
                    {/* E 分享按钮 */}
                  </div>
                </div>
                <Link href={`/post/[id]`} as={`/post/${article.id}`} scroll={false}>
                  <a aria-label={article.title}>
                    {article.cover && (
                      <LazyLoad height={120}>
                        <div className={style.coverWrapper}>
                          <img src={article.cover} alt="cover" />
                        </div>
                      </LazyLoad>
                    )}
                  </a>
                </Link>
              </main>
            </div>
          );
        })
      ) : (
        <div className={'empty'}>{t('empty')}</div>
      )}
    </div>
  );
};
