import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TaskCard from '../src/components/TaskCard';
import { buscarTarefas, deletarTarefa } from '../src/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  async function carregarTarefas() {
    try {
      const data = await buscarTarefas();
      setTarefas(data);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas. Verifique se o servidor está rodando.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  async function handleDelete(id) {
    try {
      await deletarTarefa(id);
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível remover a tarefa.');
    }
  }

  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onEdit={task => router.push({ pathname: '/form', params: { id: task.id } })}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={() => { setAtualizando(true); carregarTarefas(); }}
            colors={['#6C63FF']}
          />
        }
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Ionicons name="clipboard-outline" size={64} color="#D1D5DB" />
            <Text style={styles.vazioTexto}>Nenhuma tarefa cadastrada</Text>
            <Text style={styles.vazioHint}>Toque no + para adicionar</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/form')}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lista: { padding: 16, paddingBottom: 100 },
  vazio: { alignItems: 'center', marginTop: 80, gap: 8 },
  vazioTexto: { fontSize: 16, color: '#9CA3AF', fontWeight: '600' },
  vazioHint: { fontSize: 13, color: '#D1D5DB' },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});
