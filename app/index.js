import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TaskCard from '../src/components/TaskCard';
import { taskService } from '../src/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  async function fetchTasks() {
    try {
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch {
      setError('Não foi possível carregar as tarefas.\nVerifique se o servidor está rodando.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchTasks();
    }, [])
  );

  async function handleDelete(id) {
    try {
      await taskService.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Erro ao remover tarefa.');
    }
  }

  function handleEdit(task) {
    router.push({ pathname: '/form', params: { id: task.id } });
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorBox}>
          <Ionicons name="warning-outline" size={16} color="#B91C1C" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard task={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); fetchTasks(); }}
            colors={['#6C63FF']}
          />
        }
        ListEmptyComponent={
          !error && (
            <View style={styles.empty}>
              <Ionicons name="clipboard-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>Nenhuma tarefa cadastrada</Text>
              <Text style={styles.emptyHint}>Toque no botão + para adicionar</Text>
            </View>
          )
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/form')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16, paddingBottom: 100 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 16,
    padding: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  errorText: { color: '#B91C1C', fontSize: 13, flex: 1 },
  empty: { alignItems: 'center', marginTop: 80, gap: 8 },
  emptyText: { fontSize: 16, color: '#9CA3AF', fontWeight: '600' },
  emptyHint: { fontSize: 13, color: '#D1D5DB' },
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
    shadowColor: '#6C63FF',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});
