import pandas as pd
import matplotlib.pyplot as plt

def informe_resumen():
    try:
        # Cargar datos
        df = pd.read_csv('notas.csv')

        # Calcular promedio y porcentaje
        df['Promedio'] = (df['NotaBimestre1'] + df['NotaBimestre2']) / 2
        df['Porcentaje'] = (df['NotaFinal'] / 20) * 100

        print("--- RESUMEN GENERAL ---")
        print(df[['NombreEstudiante', 'Promedio', 'Porcentaje']].head())
        print(f"...{len(df)} filas en total\n")

        # Estadísticas principales
        media_final = df['NotaFinal'].mean()
        mediana_final = df['NotaFinal'].median()
        moda_final = df['NotaFinal'].mode()[0]

        print(f"Media (Nota Final): {media_final:.2f}")
        print(f"Mediana (Nota Final): {mediana_final:.2f}")
        print(f"Moda (Nota Final): {moda_final:.2f}")

        # Valores extremos
        print(f"\nMáximo Bimestre 1: {df['NotaBimestre1'].max()}")
        print(f"Máximo Bimestre 2: {df['NotaBimestre2'].max()}")
        print(f"Mínimo Bimestre 1: {df['NotaBimestre1'].min()}")
        print(f"Mínimo Bimestre 2: {df['NotaBimestre2'].min()}")
        print(f"Nota Final más alta: {df['NotaFinal'].max()}")
        print(f"Nota Final más baja: {df['NotaFinal'].min()}")

        # Clasificación de opiniones (palabras clave)
        def clasificar_opinion(texto):
            texto = texto.lower()
            if any(p in texto for p in ['excelente', 'encantó', 'perfecto']):
                return 'Destacado'
            elif any(p in texto for p in ['muy buena', 'aprendí mucho', 'mucho']):
                return 'Muy Bueno'
            elif any(p in texto for p in ['buena', 'agradó', 'gustó']):
                return 'Bueno'
            elif any(p in texto for p in ['normal', 'regular', 'neutral', 'aceptable']):
                return 'Aceptable'
            elif any(p in texto for p in ['malo', 'aburrida', 'no me agradó']):
                return 'Deficiente'
            elif any(p in texto for p in ['pésimo', 'horrible']):
                return 'Muy Deficiente'
            else:
                return 'Sin Clasificar'

        df['CategoriaOpinion'] = df['OpinionAlumno'].apply(clasificar_opinion)
        conteo = df['CategoriaOpinion'].value_counts()
        print("\nOpiniones de los Alumnos:")
        print(conteo)

        # Gráfico de pastel
        plt.figure(figsize=(10, 6))
        plt.pie(conteo, labels=conteo.index, autopct='%1.1f%%', startangle=140)
        plt.title('Distribución de Opiniones de los Alumnos')
        plt.axis('equal')
        plt.savefig('opiniones_alumnos.png')
        print("\nGráfico guardado como 'opiniones_alumnos.png'")

    except FileNotFoundError:
        print("Error: El archivo 'notas.csv' no fue encontrado")
    except Exception as e:
        print(f"Se produjo un error: {e}")

if __name__ == "__main__":
    informe_resumen()
