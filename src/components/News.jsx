import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import  moment  from 'moment';
import icon from '../images/bing.jpg'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';



const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = icon

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory]  = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count : simplified ? 6 : 12})
  const { data, isFetching } = useGetCryptosQuery(100);

  if(!cryptoNews?.value) return 'Loading...'

  console.log(cryptoNews)

  return (
      <Row gutter={[24, 24]}>
          {!simplified && (
              <Col span={24}>
                  <Select
                    showSearch
                    className='select-news'
                    placeholder='Select a Crypto'
                    optionFilterProp='children'
                    onChange={(value) => setNewsCategory(value) }
                    filterOption={(input, option) => option.childrem.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value='Cryptocurrency'>Cryptocurrency</Option>
                    {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                  </Select>
              </Col>
          )}
          {cryptoNews.value.map((news, i) => (
              <Col xs={23} sm={12} lg={8} key={1} >
                  <Card hoverable className='news-card'>
                    <a href={news.url} target='_blank' rel='noreferrer'>
                        <div className='news-image-container'>
                            <Title className='news-title' level={5}>{news.name}</Title>
                            <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage}  alt='news'/>
                        </div>

                        <p>{news.description > 50 ? `${news.description.substring(0, 100)}..` : news.description}</p>
                        <div className='provider-container'>
                            <div>
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                                <Text className='provider-name'>{news.provider[0]?.name}</Text>
                            </div>
                            <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                        </div>
                    </a>
                  </Card>
              </Col>
          ))}
      </Row>
  )
}

export default News
 