import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const statusLabel = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  done: 'Concluída',
};

const statusColor = {
  pending: '#F59E0B',
  in_progress: '#3B82F6',
  done: '#10B981',
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const cor = statusColor[task.status] || '#F59E0B';
  const label = statusLabel[task.status] || 'Pendente';

  function confirmarDelete() {
    Alert.alert('Remover tarefa', `Deseja remover "${task.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => onDelete(task.id) },
    ]);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: cor + '22' }]}>
          <Text style={[styles.badgeText, { color: cor }]}>{label}</Text>
        </View>
        <View style={styles.acoes}>
          <TouchableOpacity onPress={() => onEdit(task)} style={styles.btnAcao}>
            <Ionicons name="pencil-outline" size={18} color="#6C63FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmarDelete} style={styles.btnAcao}>
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.titulo}>{task.title}</Text>
      {!!task.description && <Text style={styles.descricao}>{task.description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
  acoes: { flexDirection: 'row', gap: 8 },
  btnAcao: { padding: 4 },
  titulo: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  descricao: { fontSize: 13, color: '#6B7280' },
});
