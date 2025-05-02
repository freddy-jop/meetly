import { TimeSlots } from '@/components/TimeSlots';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TimeSlots', () => {
  it('Afficher les créneaux horaires', async () => {
    const slotsList = ['10:00', '10:30', '11:00', '11:30', '12:00'];
    const mockSelect = jest.fn();
    const selectedTime = '10:30';

    render(<TimeSlots slots={slotsList} onSelect={mockSelect} selectedTime={selectedTime} />);

    const button = await screen.findByRole('button', { name: '10:00' });
    expect(button).toBeInTheDocument(); // Vérifie que le bouton avec le texte "10:00" est présent

    await userEvent.click(button); // On clique sur le bouton

    expect(mockSelect).toHaveBeenCalledWith('10:00'); // La fonction onSelect a été appelée avec "10:00"
  });
});
