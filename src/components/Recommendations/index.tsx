import React, { useCallback, useEffect, useState } from 'react'
import { instance } from '../../api/axios';

interface recoPropType {
  title: string;
  typeId: string;
  reqURL: any;
}

const List = ({title, typeId, reqURL}:recoPropType) => {
  const [recomOpen, setRecomOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [recomSelected, setRecomSelected] = useState({})



  const fetchData = useCallback( async() => {
    const res = await instance.get('locationBasedList', {params: reqURL});
    console.log('추천리스트', res);
  }, [reqURL])

  useEffect(() => {
    fetchData();
  }, [fetchData])


  
  return (
    <h2>{ title }</h2>
    
  )
}

export default List