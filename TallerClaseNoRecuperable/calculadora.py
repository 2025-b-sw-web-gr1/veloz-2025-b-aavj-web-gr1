import tkinter as tk
from tkinter import messagebox
import math

class CalculadoraInteractiva:
    def __init__(self, ventana):
        self.ventana = ventana
        self.ventana.title("Herramienta de Cálculo")
        self.ventana.geometry("400x500")

        self.cadena = ""
        self.valor_entrada = tk.StringVar()

        # Pantalla
        marco_entrada = self.crear_pantalla()
        marco_entrada.pack(side=tk.TOP)

        # Botones
        marco_botones = self.crear_botones()
        marco_botones.pack()

    def crear_pantalla(self):
        marco = tk.Frame(self.ventana, width=312, height=50, bd=0, highlightbackground="black", highlightcolor="black", highlightthickness=1)
        marco.pack(side=tk.TOP)
        campo = tk.Entry(marco, font=('arial', 18, 'bold'), textvariable=self.valor_entrada, width=50, bg="#eee", bd=0, justify=tk.RIGHT)
        campo.grid(row=0, column=0)
        campo.pack(ipady=10)
        return marco

    def crear_botones(self):
        marco = tk.Frame(self.ventana, width=312, height=322.5, bg="grey")

        # Fila 1
        self.boton(marco, "Borrar", 1, 0, 3, lambda: self.limpiar(), "#ffcccc")
        self.boton(marco, "/", 1, 3, 1, lambda: self.agregar("/"))

        # Fila 2
        self.boton(marco, "7", 2, 0, 1, lambda: self.agregar(7))
        self.boton(marco, "8", 2, 1, 1, lambda: self.agregar(8))
        self.boton(marco, "9", 2, 2, 1, lambda: self.agregar(9))
        self.boton(marco, "*", 2, 3, 1, lambda: self.agregar("*"))

        # Fila 3
        self.boton(marco, "4", 3, 0, 1, lambda: self.agregar(4))
        self.boton(marco, "5", 3, 1, 1, lambda: self.agregar(5))
        self.boton(marco, "6", 3, 2, 1, lambda: self.agregar(6))
        self.boton(marco, "-", 3, 3, 1, lambda: self.agregar("-"))

        # Fila 4
        self.boton(marco, "1", 4, 0, 1, lambda: self.agregar(1))
        self.boton(marco, "2", 4, 1, 1, lambda: self.agregar(2))
        self.boton(marco, "3", 4, 2, 1, lambda: self.agregar(3))
        self.boton(marco, "+", 4, 3, 1, lambda: self.agregar("+"))

        # Fila 5
        self.boton(marco, "0", 5, 0, 2, lambda: self.agregar(0))
        self.boton(marco, ".", 5, 2, 1, lambda: self.agregar("."))
        self.boton(marco, "=", 5, 3, 1, lambda: self.calcular())

        # Fila 6 (Operación extra)
        self.boton(marco, "Raíz", 6, 0, 4, lambda: self.raiz(), "#ccffcc")

        return marco

    def boton(self, marco, texto, fila, columna, colspan, comando, color="white"):
        tk.Button(marco, text=texto, fg="black", width=10*colspan, height=3, bd=0, bg=color, cursor="hand2", command=comando).grid(row=fila, column=columna, padx=1, pady=1, sticky="nsew", columnspan=colspan)

    def agregar(self, elemento):
        self.cadena = self.cadena + str(elemento)
        self.valor_entrada.set(self.cadena)

    def limpiar(self):
        self.cadena = ""
        self.valor_entrada.set("")

    def calcular(self):
        try:
            resultado = str(eval(self.cadena))
            self.cadena = resultado
            self.valor_entrada.set(resultado)
        except ZeroDivisionError:
            self.cadena = ""
            self.valor_entrada.set("Error: Div/0")
            messagebox.showerror("Error", "No es posible dividir por cero")
        except SyntaxError:
            self.cadena = ""
            self.valor_entrada.set("Error")
            messagebox.showerror("Error", "Expresión inválida")
        except Exception as e:
            self.cadena = ""
            self.valor_entrada.set("Error")
            messagebox.showerror("Error", str(e))

    def raiz(self):
        try:
            valor = float(eval(self.cadena))
            if valor < 0:
                raise ValueError("No se puede calcular raíz de negativo")
            resultado = str(math.sqrt(valor))
            self.cadena = resultado
            self.valor_entrada.set(resultado)
        except ValueError as e:
            self.cadena = ""
            self.valor_entrada.set("Error")
            messagebox.showerror("Error", str(e))
        except Exception:
             self.cadena = ""
             self.valor_entrada.set("Error")
             messagebox.showerror("Error", "Valor inválido para raíz cuadrada")

if __name__ == "__main__":
    ventana = tk.Tk()
    app = CalculadoraInteractiva(ventana)
    ventana.mainloop()
