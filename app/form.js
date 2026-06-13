import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { taskService } from '../src/services/api';

const STATUSES = [
  { value: 'pending',     label: 'Pendente' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'done',        label: 'Concluída' },
];

export default function FormScreen() {
  const { id } = useLocalSearchParams();
  const isEdit = !!id;
  const router = useRouter();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [saving, setSaving] = useState(false);
  const [loadingTask, setLoadingTask] = useState(isEdit);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? 'Editar Tarefa' : 'Nova Tarefa' });
  }, [isEdit, navigation]);

  useEffect(() => {
    if (!isEdit) return;
    taskService.getById(id)
      .then((task) => {
        setTitle(task.title);
        setDescription(task.description ?? '');
        setStatus(task.status);
      })
      .catch(() => setError('Não foi possível carregar a tarefa.'))
      .finally(() => setLoadingTask(false));
  }, [id, isEdit]);

  async function handleSubmit() {
    if (!title.trim()) {
      setError('O título é obrigatório.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = { title: title.trim(), description: description.trim() || null, status };
      if (isEdit) {
        await taskService.update(id, payload);
      } else {
        await taskService.create(payload);
      }
      router.back();
    } catch {
      setError('Erro ao salvar tarefa. Verifique sua conexão.');
    } finally {
      setSaving(false);
    }
  }

  if (loadingTask) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Estudar React Native"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Detalhes opcionais..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusGroup}>
          {STATUSES.map((s) => (
            <TouchableOpacity
              key={s.value}
              style={[styles.statusBtn, status === s.value && styles.statusBtnActive]}
              onPress={() => setStatus(s.value)}
            >
              <Text style={[styles.statusBtnText, status === s.value && styles.statusBtnTextActive]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, saving && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.submitBtnText}>{isEdit ? 'Salvar alterações' : 'Criar tarefa'}</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { padding: 20, gap: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: {
    color: '#B91C1C',
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 13,
  },
  label: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
  },
  multiline: { height: 100 },
  statusGroup: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  statusBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  statusBtnActive: { borderColor: '#6C63FF', backgroundColor: '#EEF2FF' },
  statusBtnText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  statusBtnTextActive: { color: '#6C63FF' },
  submitBtn: {
    marginTop: 28,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#A5B4FC' },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
