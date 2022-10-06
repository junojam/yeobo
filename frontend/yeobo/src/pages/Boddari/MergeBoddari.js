import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MergeBoddari.scss';
import Loading from '../component/Loading';


const MergeBoddari = () => {
  const userId = useSelector((state) => state.authToken.userId);
  const accessToken = useSelector((state) => state.authToken.accessToken);
  //<-- state -->
  const [bagList, setBagList] = useState(null);
  const [likeBagList, setLikeBagList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attraction, setAttraction] = useState([]);
  const [bagId1, setBagId1] = useState();
  const [bagId1name, setBagId1Name] = useState(null);
  const [bagId2name, setBagId2Name] = useState(null);
  const [bagId2, setBagId2] = useState();

  // <-- function -->
  const getBoddariList = async () => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/list/${userId}`,
        method: 'get',
        headers: {
          'X-AUTH-TOKEN': accessToken
        }
      })
      console.log(response);
      if (response.data.data.length === 0) {
        setBagList(null);
        setLoading(false);
      } else {
        setBagList(response.data.data);
        setLoading(false)
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  const getLikeBoddari = async () => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/likelist/${userId}`,
        method: 'get',
        headers: {
          'X-AUTH-TOKEN': accessToken,
        }
      })
      if (response.data.data.length === 0) {
        setLikeBagList(null);
        setLoading(false)
      } else {
        setLikeBagList(response.data.data)
        setLoading(false)
      }
    } catch (err) {
      console.log(err);
      setLoading(false)

    }
  }
  const merge = () => {
      axios({
        url: `https://j7c103.p.ssafy.io/django/MergeBoddari/Recommend/${bagId1}/${bagId2}/`,
        method: 'get',
      })
      .then((res) => {
        console.log(res.data)
        const response = res.data
        response.map((el, index) => {
          console.log(el.attraction_id);
          setAttraction(attraction.concat(el.attraction_id));
        });
      console.log('attraction:', attraction)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  // <-- useEffect -->
  useEffect(() => {
    getBoddariList();
    getLikeBoddari();
  }, []);


  // <-- rendering -->
  return (
    <div className='mergeBoddari'>
      {/* 로딩스피너 */}
      {loading ? <Loading /> : null}
      {/* -----------------------------------------------------------------------------------------------------------*/}
      {/* user가 만든 보따리 리스트 렌더링 */}
      <div className="header">
        <Link to='/'>이전</Link>
        <p>보따리 합치기</p>
        <Link to='/SaveBoddari' state={{ attraction: attraction}} onClick={() => {
          merge()
        }}>다음</Link>
      </div>

      <div className='mergeBoddari_content'>
        <div className='my-item'>
          <h1>내 보따리</h1>
          <div className='my-item-content'>
            {bagList ? (
              bagList.map((el, index) => {
                return (
                  <div className='my'>
                    <p className='myName'>{el.name}</p>
                    <img src={el.image} alt='image' className='myimg'></img>
                  <button className='myBtn' onClick={ () => {
                    setBagId1(el.id)
                    setBagId1Name(el.name)
                  }}>담기</button>
                  </div>
                )
              })
            ) : (
              <p>아직 보따리가 없습니다</p>
            )}
          </div>
        </div>
        {/* -----------------------------------------------------------------------------------------------------------*/}
        {/* 좋아요를 누른 보따리 리스트 렌더링 */}
        <div className='other-item'>
          <h1>좋아요한 보따리</h1>
          <div className='other-item-content'>
            {likeBagList ? (likeBagList.map((el, index) => {
              return (
                <div className='other'> 
                <p className='otherName'>{el.name}</p>
                  <img src={el.image} alt='image' className='otherimg'></img>
                  <button className='otherBtn' onClick={ () => {
                    setBagId2(el.id)
                    setBagId2Name(el.name)
                  }}>담기</button>
                </div>
              )

            })
            ) : (
              <p>좋아요한 보따리가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <p></p>
      <div className='mergeTarget'>
              {bagId1name && bagId2name  ?  
              <div className='mergeTarget'>
                <h1>현재 담긴 보따리 </h1>
                <h1>{bagId1name} + {bagId2name}</h1>
                <h1>합치시려면 다음을 눌러주세요!</h1>
              </div>
              : 
              <div className='mergeTarget'>
                <h1>담기를 눌러 보따리를 담아 주세요!</h1>
              </div>}
      </div>
    </div>
  )

}
export default MergeBoddari;