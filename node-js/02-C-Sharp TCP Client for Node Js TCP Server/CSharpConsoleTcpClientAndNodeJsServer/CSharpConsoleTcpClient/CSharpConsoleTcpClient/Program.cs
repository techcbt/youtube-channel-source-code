using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace CSharpConsoleTcpClient
{
    class Program
    {
        static string HOST = "127.0.0.1";
        static int PORT = 9000;

        static TcpClient client;

        static void OpenConnection()
        {
            if (client != null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("--Connection is already open---");
            }
            else
            {
                try
                {
                    client = new TcpClient();
                    client.Connect(HOST, PORT);
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("Connection establised successfully..");
                }
                catch (Exception ex)
                {
                    client = null;
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("ERROR: Connection could not be established. Msg: " + ex.Message);
                }
            }
        }

        static void CloseConnection()
        {
            if (client == null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("--Connection is not open or already closed---");
                return;
            }

            try
            {
                client.Close();
            }
            catch (Exception ex)
            {
            }
            finally
            {
                client = null;
            }

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Connection closed successfully");
        }

        static void SendData(string data)
        {
            if (client == null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("--Connection is not open or closed--");
                return;
            }

            //send
            NetworkStream nwStream = client.GetStream();
            byte[] bytesToSend = ASCIIEncoding.ASCII.GetBytes(data);
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Sending: " + data);
            nwStream.Write(bytesToSend, 0, bytesToSend.Length);

            //receive
            byte[] bytesToRead = new byte[client.ReceiveBufferSize];
            int bytesRead = nwStream.Read(bytesToRead, 0, client.ReceiveBufferSize);
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("Received: " + Encoding.ASCII.GetString(bytesToRead, 0, bytesRead));

        }

        static void Main(string[] args)
        {
            Console.Clear();

            string lineRead;

            do
            {
                Console.ResetColor();
                Console.Write("\n\nEnter option (1-Open, 2-Send, 3-Close, 4-Quit): ");
                lineRead = Console.ReadLine();
                switch (lineRead)
                {
                    case "1":
                        OpenConnection();
                        break;
                    case "2":
                        Console.Write("Enter data to send: ");
                        var data = Console.ReadLine();
                        SendData(data);
                        break;
                    case "3":
                        CloseConnection();
                        break;
                }

            } while (!lineRead.Equals("4"));
        }
    }
}
