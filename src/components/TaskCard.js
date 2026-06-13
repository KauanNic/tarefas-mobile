import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STATUS_CONFIG = {
  pending:     { label: 'Pendente',    color: '#F59E0B', icon: 'time-outline' },
  in_progress: { label: 'Em andamento', color: '#3B82F6', icon: 'reload-outline' },
  done:        { label: 'Concluída',   color: '#10B981', icon: 'checkmark-circle-outline' },
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const cfg = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.pending;

  function confirmDelete() {
    Alert.alert('Remover tarefa', `Deseja remover "${task.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => onDelete(task.id) },
    ]);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: cfg.color + '22' }]}>
          <Ionicons name={cfg.icon} size={13} color={cfg.color} />
          <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(task)} style={styles.actionBtn}>
            <Ionicons name="pencil-outline" size={18} color="#6C63FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete} style={styles.actionBtn}>
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>{task.title}</Text>
      {!!task.description && <Text style={styles.desc}>{task.description}</Text>}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 4 },
  title: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  desc: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
});
