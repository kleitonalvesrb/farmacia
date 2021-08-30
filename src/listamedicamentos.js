import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import axios from 'axios';

const ListaMedicamentos = () =>{
    const navigation = useNavigation();
    const [medicamentos,setMedicamentos] = useState([])
    const route = useRoute();
    useEffect(()=>{
        axios.get('http://10.0.2.2:3000/medicamentos')
        .then(
            (res) =>{
                
                setMedicamentos(res.data);
            }
        )
        .catch(
            (err)=>alert('Erro: '+err)
        );
    },[route.params?.medicamento]);
    
    return (
        <View>
            <View>
                <Button 
                    onPress={()=>navigation.navigate('Medicamento')}
                    title="Cadastrar novo medicamento"
                />
            </View>
            <View>
                <FlatList
                    data={medicamentos}
                    renderItem={({item})=>(
                        <TouchableOpacity 
                           onPress={()=>navigation.navigate('Medicamento',{medicamento: item})}
                            style={{flexDirection : 'row', 
                                    backgroundColor: 'white'}}>
                            <Image
                                source={{uri: item.img ? item.img : null}}
                                style={{width: 100, height: 100, marginTop: 5}}
                            />
                            <View style={{paddingHorizontal: 10, marginTop: 10}}>
                                <Text style={{fontSize: 16, 
                                    fontWeight: 'bold'}}>
                                        {item.produto}
                                </Text>
                                <Text>{item.apresentacao}</Text>
                                <Text>{item.laboratorio}</Text>
                                <Text>Itervalo consumo: {item.intervaloConsumo}</Text>
                                <Text>Data inicio: {item.dataInicio}</Text>
                            </View>
                           
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

export default ListaMedicamentos;