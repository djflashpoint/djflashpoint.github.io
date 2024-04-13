#include "time.h"
using namespace std;
int main()
{
    if (true)
    {
        time_t now = time(NULL);
        std::cout << (ctime(&now)) << std::endl;
        Sleep(1000);
        system("cls");
    }
}