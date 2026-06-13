import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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
import { atualizarTarefa, buscarTarefa, criarTarefa } from '../src/services/api';

const statusOpcoes = [
  { valor: 'pending', label: 'Pendente' },
  { valor: 'in_progress', label: 'Em andamento' },
  { valor: 'done', label: 'Concluída' },
];

export default function FormScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pending');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!id) return;
    buscarTarefa(id).then(tarefa => {
      setTitulo(tarefa.title);
      setDescricao(tarefa.description || '');
      setStatus(tarefa.status);
    });
  }, [id]);

  async function salvar() {
    if (!titulo.trim()) {
      setErro('O título é obrigatório.');
      return;
    }
    setSalvando(true);
    setErro('');
    try {
      const dados = { title: titulo, description: descricao, status };
      if (id) {
        await atualizarTarefa(id, dados);
      } else {
        await criarTarefa(dados);
      }
      router.back();
    } catch (e) {
      setErro('Erro ao salvar. Tente novamente.');
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Estudar para a prova"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputGrande]}
          placeholder="Detalhes da tarefa..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusGroup}>
          {statusOpcoes.map(op => (
            <TouchableOpacity
              key={op.valor}
              style={[styles.statusBtn, status === op.valor && styles.statusBtnAtivo]}
              onPress={() => setStatus(op.valor)}
            >
              <Text style={[styles.statusBtnTexto, status === op.valor && styles.statusBtnTextoAtivo]}>
                {op.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.btnSalvar} onPress={salvar} disabled={salvando}>
          {salvando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnSalvarTexto}>{id ? 'Salvar alterações' : 'Criar tarefa'}</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  conteudo: { padding: 20, gap: 4 },
  erro: {
    color: '#B91C1C',
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
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
  },
  inputGrande: { height: 100 },
  statusGroup: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  statusBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  statusBtnAtivo: { borderColor: '#6C63FF', backgroundColor: '#EEF2FF' },
  statusBtnTexto: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  statusBtnTextoAtivo: { color: '#6C63FF' },
  btnSalvar: {
    marginTop: 28,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnSalvarTexto: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
