import React, { useEffect, useState } from 'react';
import { Button,Image, TextInput, View,TouchableOpacity,Text, ScrollView } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import {useNavigation,useRoute} from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

//import DatePicker from 'react-native-date-picker'


const Medicamento = () =>{
   const [remedio,setRemedio] = useState('');
   const [codBarras, setCodBarras] = useState('');
   const [principioAtivo, setPrincipioAtivo] = useState('');
   const [cnpj, setCnpj] = useState('');
   const [laboratorio,setLaboratorio] = useState('');
   const [apresentacao,setApresentacao] = useState('');
   const [classeTerapeutica, setClasseTerapeutica] = useState('');
   const [restricao,setRestricao] = useState('');
   const [produto, setProduto] = useState('');
   const [tempoTratamento,setTempoTratamento] = useState('');
   const [dataInicio, setDataInicio] = useState('');
   const [intervaloConsumo, setIntervaloConsumo] = useState('');
   const [img, setImg] = useState('');
   const navigation = useNavigation();
   const [editar,setEditar] = useState(false);
   const [id,setId] = useState('');
   const [selectedIntervalo, setSelectedIntervalo] = useState();

   const route = useRoute();
   useEffect(()=>{
     if(!codBarras){
        setRemedio(route.params?.medicamento);
        setCodBarras(remedio?.codBarraEan)
        setPrincipioAtivo(remedio?.principioAtivo);
        setLaboratorio(remedio?.laboratorio);
        setCnpj(remedio?.cnpj);
        setProduto(remedio?.produto);
        setClasseTerapeutica(remedio?.classeTerapeutica);
        setRestricao(remedio?.restricao);
        setApresentacao(remedio?.apresentacao);
        setIntervaloConsumo(remedio?.intervaloConsumo);
        setSelectedIntervalo(remedio?.intervaloConsumo);
        setTempoTratamento(remedio?.tempoTratamento);
        setDataInicio(remedio?.dataInicio);
        setImg(remedio?.img);
        setEditar(true);
        setId(remedio?.id);
      
     }
  });
   
  const getPhoto = () =>{
    ImagePicker.launchImageLibrary({title:'Selecione uma imagem'}, (img)=>{
      const imgTemp = JSON.parse(JSON.stringify(img)).assets;
      setImg(imgTemp[0].uri);
    })
  }
  const buscaMedicamento = ()=>{
    if(codBarras.length > 0){
      axios.get('http://mobile-aceite.tcu.gov.br:80/mapa-da-saude/rest/remedios?codBarraEan='+codBarras+'&quantidade=1')
      .then((res)=>{
          console.log('codigo '+codBarras)
          setRemedio(res.data[0]);
          setPrincipioAtivo(remedio?.principioAtivo);
          setLaboratorio(remedio.laboratorio);
          setCnpj(remedio.cnpj);
          setProduto(remedio.produto);
          setClasseTerapeutica(remedio.classeTerapeutica);
          setRestricao(remedio.restricao);
          setApresentacao(remedio.apresentacao);
          console.log(remedio);
        
      })
      .catch(
        (err) => console.log('Erro '+err)
      );
    }else{
      alert('Favor informar o código de barras!');
    }
   }

   const deletar = ()=>{
     axios.delete('http://10.0.2.2:3000/medicamentos/'+remedio?.id)
     .then(
       (res)=>{
        navigation.navigate('Lista Medicamentos');
       }
     ).catch(
       (err) => alert('Erro '+err)
     );
   }

   const salvar = ()=>{
     if(codBarras.length < 1){
        alert('O código de barras deve ser informado');
     }else{
       if(!remedio?.id){
            axios.post('http://10.0.2.2:3000/medicamentos',{
                codBarraEan : codBarras,
                principioAtivo : principioAtivo,
                cnpj: cnpj,
                laboratorio : laboratorio,
                produto : produto,
                apresentacao : apresentacao,
                classeTerapeutica : classeTerapeutica,
                tempoTratamento : tempoTratamento,
                intervaloConsumo: intervaloConsumo,
                dataInicio : dataInicio,
                restricao: restricao,
                img: img
            }).then(
              (res)=>{
                alert('Salvo com sucesso!');
                navigation.navigate('Lista Medicamentos',{medicamento : res});
              }
            )
            .catch(
              (err)=> alert('Erro '+err)
            );
      }else{
        axios.patch('http://10.0.2.2:3000/medicamentos/'+id,{
                codBarraEan : codBarras,
                principioAtivo : principioAtivo,
                cnpj: cnpj,
                laboratorio : laboratorio,
                produto : produto,
                apresentacao : apresentacao,
                classeTerapeutica : classeTerapeutica,
                tempoTratamento : tempoTratamento,
                intervaloConsumo: intervaloConsumo,
                dataInicio : dataInicio,
                restricao: restricao,
                img: img
            }).then(
              (res)=>{
                alert('atualizado com sucesso!');
                navigation.navigate('Lista Medicamentos',{medicamento : res});
              }
            )
            .catch(
              (err)=> alert('Erro '+err)
            );
      }
    }
   }

  return (
    <ScrollView>
        <View >
            <View style={{flexDirection: 'row', alignItems: 'center',
             justifyContent: 'space-around'}}>
              <TextInput
                  placeholder="Código de barras"
                  keyboardType="numeric"
                  value={codBarras}
                  onChangeText={(txt)=>setCodBarras(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '75%',height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  
                <TouchableOpacity
                  style={{backgroundColor: 'blue',height:50, borderRadius: 10,width:'20%'}}
                onPress={buscaMedicamento}>
                    <Text style={{fontSize : 16 ,fontWeight: 'bold', color : '#FFF',marginTop: 15, marginLeft: 10}}> Buscar</Text>
                </TouchableOpacity>
               </View>

                <View style={{flexDirection: 'row',
                             alignItems: 'center',flexWrap : 'wrap'}}>  

                  <Image 
                    style={{width: 100, height: 100, borderRadius: 50, 
                    borderColor: "#5a5a5a",borderWidth: 1,
                    marginHorizontal: 10}} 
                    source={{uri: img ? img : null}}
                    />

                    <Button title="Carregar Imagem"
                       onPress={getPhoto}/>
                  
          
                </View>

               <TextInput
                  placeholder="Princípio Ativo"
                  keyboardType="default"
                  value={principioAtivo}
                  onChangeText={(txt)=>setPrincipioAtivo(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  
                <TextInput
                  placeholder="Laboratorio"
                  value={laboratorio}
                  onChangeText={(txt)=>setLaboratorio(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  

                <TextInput
                  placeholder="CNPJ"
                  value={cnpj}
                  onChangeText={(txt)=>setCnpj(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  

                <TextInput
                  placeholder="Produto"
                  value={produto}
                  onChangeText={(txt)=>setProduto(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  
                <TextInput
                  placeholder="Apresentação"
                  value={apresentacao}
                  onChangeText={(txt)=>setApresentacao(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                /> 
                <TextInput
                  placeholder="Classe terapeutica"
                  value={classeTerapeutica}
                  onChangeText={(txt)=>setClasseTerapeutica(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />   
                <TextInput
                  placeholder="Restrição"
                  value={restricao}
                  onChangeText={(txt)=>setRestricao(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  

                <Picker
                  selectedValue={selectedIntervalo}
                  onValueChange={(itemValue, itemIndex) =>{
                    setSelectedIntervalo(itemValue)
                    setIntervaloConsumo(itemValue)
                    }
                  }
                >
                    <Picker.Item label="2 horas" value="2"/>
                    <Picker.Item label="4 horas" value="4"/>
                    <Picker.Item label="6 horas" value="6"/>
                    <Picker.Item label="8 horas" value="8"/>
                    <Picker.Item label="10 horas" value="10"/>
                    <Picker.Item label="12 horas" value="12"/>
                    <Picker.Item label="24 horas" value="24"/>

                </Picker>
              

               
                 <TextInput
                  placeholder="Quantidade dias do tratamento"
                  keyboardType="numeric"
                  value={tempoTratamento}
                  onChangeText={(txt)=>setTempoTratamento(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%', marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  
                 <TextInput
                  placeholder="Inicio do tratamento"
                  keyboardType="default"
                  value={dataInicio}
                  onChangeText={(txt)=>setDataInicio(txt)}
                  style={{fontSize: 16, marginTop: 10, 
                      borderWidth: 1, width: '90%',
                      marginBottom: 50,
                      marginHorizontal: 10,height:50,
                      marginBottom: 10, borderRadius: 10}}
                  placeholderTextColor="#5a5a5a"
                />  

              {remedio?.id ?(
                <TouchableOpacity
                style={{backgroundColor: 'red',height:40 ,borderRadius: 0,width:'100%', alignItems: 'center', marginVertical: 10}}
                onPress={deletar}>
                  <Text style={{fontSize : 16 ,fontWeight: 'bold', color : '#FFF',marginTop: 10}}> Deletar</Text>
              </TouchableOpacity>
              ) 
                : (<Text></Text>)}        
               
                <Button title="Salvar" onPress={salvar} style={{marginBottom:10, marginHorizontal: 10}}/>
            </View>
    </ScrollView>
  )
}
//<DatePicker date={date} mode={'date'} locale={'pt'} onDateChange={setDate}/>

export default Medicamento;